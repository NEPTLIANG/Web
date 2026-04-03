const fs = require("fs/promises");
const { API_KEY, API_BASE } = require("../../../.secrets/dify-api.secret.js");

// 配置
const CONCURRENCY_COUNT = 5; //并发数
const RETRY_LIMIT = 3; //重试次数
const RETRY_DELAY_MS = 500; //重试延迟
const TIMEOUT_MS = 30000; //超时时间

const ASSERT_WORKSPACE_PATH = "asserts/large-model-registration";
const INPUT_FILE_PATH = `${ASSERT_WORKSPACE_PATH}/question-reject.json`; //输入文件路径，要求是一个包含问题的数组
const OUTPUT_FILE_PATH = `${ASSERT_WORKSPACE_PATH}/results-reject.jsonl`;
const PROMPT_TO_APPEND =
  "你是纯文本输出助手，严格遵守：输出内容不得包含任何markdown、HTML或格式化符号（如*, _, #等），只输出原始文字。";
const RESULT_VALIDATION_RULES = [
  {
    validator: (result) => !/(?<!‘)\*\*.*\*\*/.test(result) /* || console.log(result) */,
    message: "输出了 markdown",
  },
];

const LOG_GREEN_FOREGROUND = "\x1b[32m";
const LOG_GRAY_FOREGROUND = process.stdout.isTTY ? "\x1b[2m" : "";
const LOG_BOLD_FONT = "\x1b[1m";
const LOG_STYLE_END = process.stdout.isTTY ? "\x1b[0m" : "";

const request = async (question, index) => {
  const url = `${API_BASE}/chat-messages`;
  const body = {
    inputs: {},
    query: question,
    response_mode: "blocking",
    user: "user",
  };

  const timeoutAbortController = new AbortController();
  const timeoutId = setTimeout(
    () => timeoutAbortController.abort(),
    TIMEOUT_MS,
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: timeoutAbortController.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    // console.log(await response.json())
    const { answer, conversation_id } = await response.json();
    return {
      index,
      answer,
      question,
      conversationId: conversation_id || null,
      timestamp: new Date().toISOString(),
      success: true,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("请求超时");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

const askWithRetry = async (question, index) => {
  let lastError = null;
  for (let attempt = 1; attempt <= RETRY_LIMIT; attempt++) {
    try {
      return await request(question, index);
    } catch (error) {
      lastError = error;
      console.error(
        `问题 [${index}] 第 ${attempt}/${RETRY_LIMIT} 次尝试失败：${error.message}（${question}）`,
      );
      if (attempt < RETRY_LIMIT) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }
  throw new Error({
    index,
    question,
    error: lastError?.message,
    success: false,
    timestamp: new Date().toISOString(),
  });
};

const loadProcessedIndices = async () => {
  try {
    const content = await fs.readFile(OUTPUT_FILE_PATH, "utf8");
    const lines = content.trim().split("\n").filter(Boolean);
    const indices = new Set();
    for (const line of lines) {
      const obj = JSON.parse(line);
      if (obj.answer && obj.index && RESULT_VALIDATION_RULES.every(({
        validator
      }) => validator(JSON.stringify(obj.answer)))) {
        indices.add(obj.index);
      }
    }
    return indices;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("文件不存在");
      return new Set();
    }
    throw error;
  }
};

const runWithResume = async (
  questionList,
  { concurrency, concurrencyWorker, outputFile },
) => {
  const results = new Array(questionList.length);
  let nextQuestionIndex = 0;
  let completedQuestionNumber = 0;
  const questionCount = questionList.length;

  await fs.writeFile(
    outputFile,
    "",
    {
      flag: "a", //如果文件存在，不清空
    } /* 'utf8' */,
  ); //确保输出文件存在，若不存在则创建空文件

  const concurrencyRunner = async () => {
    while (nextQuestionIndex < questionCount) {
      const questionIdx = nextQuestionIndex++;
      let { question, index } = questionList[questionIdx];

      question = `${question}${PROMPT_TO_APPEND}`;
      console.log(
        `[${new Date().toLocaleString()}] ${index} 请求中${LOG_GRAY_FOREGROUND}：${question}${LOG_STYLE_END}`,
      );
      try {
        const result = await concurrencyWorker(question, index);
        let errorMessage = "";
        if (
          RESULT_VALIDATION_RULES.some(({ validator, message }) => {
            errorMessage = message;
            return !validator(result);
          })
        ) {
          throw new Error(errorMessage);
        }
        results[questionIdx] = result;

        const line = JSON.stringify(result) + "\n";
        await fs.appendFile(outputFile, line, "utf8");
        completedQuestionNumber++;
        console.log(`${process.stdout.isTTY ? LOG_GREEN_FOREGROUND.concat(LOG_BOLD_FONT) : ""}[${
          new Date().toLocaleString()
        }] ${completedQuestionNumber}/${questionCount} 完成${LOG_STYLE_END}`,
        );
      } catch (error) {
        console.error(
          `[${new Date().toLocaleString()}] ${questionIdx} 重试失败：${error.message}（${question}）`,
        );
      }
    }
  };
  const concurrencyWorkerGroups = Array(concurrency)
    .fill()
    .map(() => concurrencyRunner());
  await Promise.all(concurrencyWorkerGroups);
  console.log(`全部完成，结果已保存至 ${outputFile}`);
  return results;
};

const main = async () => {
  const content = await fs.readFile(INPUT_FILE_PATH, "utf8");
  const questionList = JSON.parse(content);
  if (!Array.isArray(questionList)) {
    throw new Error("文件内容不是数组");
  }

  const processedQuestion = await loadProcessedIndices();
  console.log(`已处理 ${processedQuestion.size} 个问题`);
  const pendingQuestionList = []; //待处理列表
  for (let i = 0; i < questionList.length; i++) {
    const questionNumber = i + 1;
    if (!processedQuestion.has(questionNumber)) {
      pendingQuestionList.push({
        index: questionNumber,
        question: questionList[i],
      });
    }
  }
  if (pendingQuestionList.length === 0) {
    return console.log("所有问题已处理完毕");
  }
  const startTime = Date.now();
  console.log(
    `待处理问题数：${pendingQuestionList.length}，开始时间：${new Date().toString()}，共 ${
      questionList.length
    } 个问题，并发数 ${CONCURRENCY_COUNT}`,
  );

  const resultList = await runWithResume(pendingQuestionList, {
    concurrency: CONCURRENCY_COUNT,
    concurrencyWorker: askWithRetry,
    outputFile: OUTPUT_FILE_PATH,
  });
  const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const successCount = resultList.filter((result) => result.success).length;
  const failCount = resultList.length - successCount;
  // await fs.writeFile(OUTPUT_FILE_PATH, JSON.stringify(resultList, null, 2));
  console.log(
    `耗时 ${elapsedTime} 秒，成功 ${successCount}，失败 ${failCount}`,
  );
};

main();
