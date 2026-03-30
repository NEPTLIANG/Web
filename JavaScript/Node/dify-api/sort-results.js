const fs = require('fs').promises;

const WORKSPACE_PATH = 'asserts/large-model-registration'

/**
 * 处理结果：
 * 1. 过滤失败结果
 * 2. 排序
 * @param {string} inputFilePath 输入文件路径
 * @param {string} outputFilePath 输出文件路径
 */
const handleResult = async (inputFilePath, outputFilePath) => {
    const content = await fs.readFile(inputFilePath, 'utf8');
    const lineList = content.trim().split('\n').filter(Boolean);
    const originalResults = lineList.map(line => JSON.parse(line));
    const successResults = originalResults.filter(result => result.answer);
    successResults.sort((next, previous) => next.index - previous.index);
    const sorted = successResults.map(line => JSON.stringify(line.answer)).join('\n');

    await fs.writeFile(outputFilePath, sorted + '\n', 'utf8');
    console.log(`已保存 ${successResults.length} 条成功结果`)
}

handleResult(
    `${WORKSPACE_PATH}/results-no-reject.jsonl`,
    `${WORKSPACE_PATH}/results-no-reject-sorted.json`,
);
