/*
 * @Author: luoming.liang neptliang@outlook.com
 * @Date: 2026-03-25 14:33:37
 * @LastEditors: luoming.liang neptliang@outlook.com
 * @LastEditTime: 2026-04-03 15:01:57
 * @FilePath: \knowledge-webc:\Users\MING\web\JavaScript\Node\dify-api\sort-results.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const fs = require('fs').promises;

const WORKSPACE_PATH = 'asserts/large-model-registration';
const INPUT_FILE_PATH = `${WORKSPACE_PATH}/results-reject.jsonl`;
const OUTPUT_FILE_PATH = `${WORKSPACE_PATH}/results-reject-sorted.jsonl`;

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
    const successResultList = originalResults.filter(
        (result) => result.answer && !/(?<!‘)\*\*.*\*\*/.test(result.answer),
    );
    successResultList.sort((nextResult, previousResult) => {
        const indexOrder = nextResult.index - previousResult.index;
        if (indexOrder === 0) {
            return [nextResult, previousResult]
                .map((result) => new Date(result.timestamp).getTime())
                .reduce((previous, next) => previous - next);
        }
        return indexOrder;
    });
    const sorted = [];
    successResultList.forEach((line) => {
        sorted[line.index] = JSON.stringify(/* { q: line.timestamp, */
            line.answer,
        /* } */);
    });
    const outputContent = sorted.join('\n');

    await fs.writeFile(outputFilePath, outputContent + '\n', 'utf8');
    console.log(`已保存 ${sorted.length} 条成功结果`);
};

handleResult(INPUT_FILE_PATH, OUTPUT_FILE_PATH);
