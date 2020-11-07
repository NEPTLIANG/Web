/*
 * @Author: NeptLiang
 * @Date: 2020-11-07 23:29:23
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-11-08 01:37:59
 * @Description: 正则实现模板字符串效果
 */
let template = (str, obj) => {
    let match = [...str.matchAll(/\$\{(.+?)\}/g)]
    // console.log(match, obj)
    for (index in match) {
        let attr = eval(`obj.${match[index][1]}`)
        str = str.replace(match[index][0], attr)
        // console.log(index)
    }
    // console.log(str)
    // attr = 'fuck'
    // console.log(eval(`obj.${attr}`))
    return str
}

console.log(template('${who}Will${fuck}The${world}', {
    world: 'Code',
    fuck: 'Debug',
    who: 'MING'
}))