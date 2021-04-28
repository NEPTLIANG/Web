/*
 * @Author: NeptLiang
 * @Date: 2021-03-04 16:07:42
 * @LastEditors: NeptLiang
 * @LastEditTime: 2021-03-04 17:46:45
 * @Description: Webpack demo
 */
import _ from 'lodash';
import './style.css';
import Icon from './Webpack.svg'

function component() {
    const element = document.createElement('div');

    // lodash，现在通过一个 script 引入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // 将图像添加到我们已经存在的 div 中。
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());