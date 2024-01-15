chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== 'install') { return; }
    // 创建闹钟。在 alarmInfo 指定的时间附近时，会触发 onAlarm 事件
    await chrome.alarms.create('202020', { periodInMinutes: 0.5 });

    chrome.alarms.onAlarm.addListener(async alarm => {
        console.log(alarm)
        // 从当前聚焦的窗口（或最近聚焦的窗口，如果未聚焦任何 Chrome 窗口）中检索活动标签页。这通常可以视为用户的当前标签页。
        const tab = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
        });
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            func: console.log,
        });
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