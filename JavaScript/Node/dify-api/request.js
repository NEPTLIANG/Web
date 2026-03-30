const fs = require("fs/promises");
const { API_KEY, API_BASE } = require("../../../.secrets/dify-api.secret.js");

// 配置
const CONCURRENCY_COUNT = 5; //并发数
const RETRY_LIMIT = 3; //重试次数
const RETRY_DELAY_MS = 500; //重试延迟
const TIMEOUT_MS = 30000; //超时时间

const WORKSPACE_PATH = "asserts/large-model-registration";
const INPUT_FILE_PATH = `${WORKSPACE_PATH}/question-no-reject.json`;
const OUTPUT_FILE_PATH = `${WORKSPACE_PATH}/results-no-reject.jsonl`;

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
        question,
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
      if (obj.answer && obj.index) {
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
      const { question, index } = questionList[questionIdx];
      try {
        console.log(question);
        results[questionIdx] = await concurrencyWorker(question, index);

        const line = JSON.stringify(results[questionIdx]) + "\n";
        await fs.appendFile(outputFile, line, "utf8");
        completedQuestionNumber++;
        console.log(
          `[${new Date().toLocaleString()}] ${completedQuestionNumber}/${questionCount} 完成`,
        );
      } catch (error) {
        console.error(
          `[${new Date().toLocaleString()}] ${questionIdx} 重试失败`,
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
  const questionList = JSON.parse(content).map((question, i) => ({
    question,
    index: i + 1,
  }));
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
