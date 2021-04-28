/*
 * @Author: NeptLiang
 * @Date: 2021-03-25 14:45:49
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-03-25 14:56:15
 * @Description: 删除模板：
 *      在用户输入scaffolding delete命令时，
 *      删掉template.json中的模板信息
 */

module.exports = function() {
    prompt(questions).then(function(data) {
        delete tplJson[data.name];

        fs.writeFile(
            tplPath,
            JSON.stringify(tplJson),
            'utf-8',
            function(err, data) {
                if (err) {
                    console.log('模板删除失败');
                } else {
                    console.log('模板删除成功');
                }
            }
        );
    });
};