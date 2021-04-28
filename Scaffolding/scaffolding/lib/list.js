/*
 * @Author: NeptLiang
 * @Date: 2021-03-25 14:11:10
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-03-25 17:11:21
 * @Description: 显示模板：
 *      在用户输入scaffolding list命令时，
 *      读取根目录下存储模板信息的文件template.json，
 *      在终端显示
 */

const chalk = require('chalk');
const tplJson = require(`${__dirname}\\..\\template.json`);

module.exports = function() {
        Object.keys(tplJson).forEach((item) => {
                    let tplData = tplJson[item];
                    console.log(`
            ${chalk.yellow('★')}    ${chalk.yellow(tplData.name)} - ${tplData.description} - ${chalk.red(`模板安装包${tplData.npm}`)}`);
    })
}