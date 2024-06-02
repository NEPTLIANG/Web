alert(chrome.runtime);
console.log(chrome.runtime);

chrome.runtime.onStartup?.addListener(async () => {
    alert('start')
    console.log('start')
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        func: () => {
            alert('exec');
            console.log('exec');
        },
    }).then(() => console.log('injected')).catch(() => console.warn('inject fail'));
})

// 首次安装扩展程序、将扩展程序更新到新版本以及 Chrome 更新到新版本时触发。
chrome.runtime.onInstalled?.addListener(async ({ reason }) => {
    alert('install')
    console.log('install')
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
    });
    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        func: () => {
            alert('exec');
            console.log('exec');
        },
    }).then(() => console.log('injected')).catch(() => console.warn('inject fail'));

    if (reason !== 'install') { return; }
    // 创建闹钟。在 alarmInfo 指定的时间附近时，会触发 onAlarm 事件
    await chrome.alarms.create('202020', { periodInMinutes: 0.5 });

    // 在闹钟已过去时触发。对于活动页面很有用。
    chrome.alarms.onAlarm.addListener(async alarm => {
        alert('alarm')
        console.log(alarm)
        // 从当前聚焦的窗口（或最近聚焦的窗口，如果未聚焦任何 Chrome 窗口）中检索活动标签页。这通常可以视为用户的当前标签页。
        const [tab] = await chrome.tabs.query({
            active: true,   //选项卡在其窗口中是否处于活动状态。
            lastFocusedWindow: true     //选项卡是否位于最后一个获得焦点的窗口中。
        });
        // 将脚本注入目标上下文。该脚本将在 document_idle 时运行。如果脚本计算结果为 Promise，浏览器将等待 Promise 解决并返回结果值。
        chrome.scripting.executeScript({
            target: {   //指定要注入脚本的目标的详细信息。
                tabId: tab.id   //要注入的选项卡的 ID。
            },
            func: () => {   //要注入的 JavaScript 函数。该函数将被序列化，然后反序列化以进行注入。这意味着任何绑定参数和执行上下文都将丢失。
                alert('exec');
                console.log('exec');
            }
        }).then(() => console.log('injected')).catch(() => console.warn('inject fail'));
    });
});

// let b;
// if (!Array.isArray(b)) { b = [] };
// b.push(1)
// console.log(b)
// const a = document.createElement('div');
// a.innerHTML = 'b';
// a.style.position = 'fixed';
// a.style.top = '64px';
// a.style.right = '64px';
// a.style.zIndex = '10086';
// console.log({ document })
// document.body.appendChild(a);
// setTimeout(() => {
//     a.style.display = 'none';
// }, 2000);
// setTimeout(() => {
//     console.log(2)
//     a.style.display = 'block';
// }, 60000);