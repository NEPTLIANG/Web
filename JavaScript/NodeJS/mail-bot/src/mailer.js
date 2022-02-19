/*
 * @Author: NeptLiang
 * @Date: 2022-02-19 00:02:24
 * @LastEditors: NeptLiang
 * @LastEditTime: 2022-02-19 16:30:48
 * @Description: file content
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const nodemailer = require('nodemailer');
const axios = require('axios');
//const querystring = require('querystring')
const FormData = require('form-data');

const form = new FormData();

const sent = msg => {
    let transporter = nodemailer.createTransport({
        service: 'QQ',
        port: 465,      //记得放开腾讯云端口策略的465端口
        secureConnection: true,
        auth: {
            user: '916616515@qq.com',
            pass: 'okxepnoojlphbecc'
        }
    });

    let mailOptions = {
        from: 'TCloud <916616515@qq.com>',      //一定要按照格式：“署名<上面的认证邮箱>”，否则无法发送
        to: 'ming19980628@outlook.com',
        subject: 'TCloud Server Mail',
        text: msg
    };

    console.log('Processing');
    transporter.sendMail(mailOptions, (err, info) => {
        console.log(err || info);
    });
}

let msg = '';
axios.post('http://www.ufc.cn/Api/Handler.ashx', 'method=Schedule'/*{
    //body: 'method=Schedule'
    //body: querystring.stringify({method: 'Schedule'})
    ...form.append('method', 'Schedule')
}*/, form.getHeaders()).then(e => {
    msg = e.data.result[0].Date.Date
    console.log(e.data.result[0].Main.forEach(game => {
        msg = `${msg}
        ${game.CnSname} VS ${game.CnVname}`
    }))
    console.log(msg);
    sent(msg)
}).catch(e => console.log(e));
