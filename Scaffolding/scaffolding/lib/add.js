/*
 * @Author: NeptLiang
 * @Date: 2021-03-25 14:25:43
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-03-25 14:53:33
 * @Description: 添加模板：
 *      在用户输入scaffolding add命令时，
 *      使用inquirer库向用户提问，并获取输入，
 *      将新加的模板信息，写入template.json
 */

const fs = require('fs');
const path = require('path');
const { prompt } = require('inquirer');
const tplPath = path.resolve(__dirname, '../template.json');
const tplJson = require(tplPath);

const questions = [{
    type: 'input',
    name: 'name',
    message: '模板名称',
    validate: function(val) {
        if (!val) {
            return '模板名称不为空';
        } else {
            return true;
        }
    }
}, {
    type: 'input',
    name: 'description',
    message: '模板描述',
    validate: function(val) {
        if (!val) {
            return '模板描述不为空';
        } else {
            return true;
        }
    }
}, {
    type: 'input',
    name: 'npm',
    message: '模板包名称（ps: 创建项目使用这个npm包）',
    validate: function(val) {
        if (!val) {
            return '模板包名不为空';
        } else {
            return true;
        }
    }
}];

module.exports = function() {
    prompt(questions).then(function(data) {
        tplJson[data.name] = {};
        tplJson[data.name]['name'] = data.name;
        tplJson[data.name]['description'] = data.description;
        tplJson[data.name]['npm'] = data.npm;

        fs.writeFile(
            tplPath,
            JSON.stringify(tplJson),
            'utf-8',
            function(err, data) {
                if (err) {
                    console.log('模板添加失败');
                } else {
                    console.log('模板添加成功');
                }
            }
        );
    });
};