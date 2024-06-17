const element1 = document.querySelector('.container1');
const element2 = document.querySelector('.container2');
const element3 = document.querySelector('.container3');

// 创建监听器
const observer = new IntersectionObserver(changes => {
    /**
     * 回调函数执行：
     * * 创建监听器、且监听了DOM元素会立即执行一次
     *      （连续监听多个DOM只触发一次，但是如果监听是分隔开的，每新监听一个元素都会触发执行一次）
     * * 当监听的元素和可视窗口交叉状态改变，也会触发执行
     *      （默认是“一露头”或者“完全出现”，会触发；
     *      也可以基于第二个Options配置项中的threshold来指定规则）
     *      * threshold: [0]    // 一露头 & 完全出现
     *      * ...
     *      * threshold: [1]    // 完全出现 & 出现一点
     * ----
     * changes: 是一个数组，记录了每一个监听元素和可视窗口的交叉信息
     * * boundingClientRect: 记录当前监听元素的getBoundingClientRect获取的值
     * * isIntersecting: true / false，true代表出现在可视窗口中，false则反之
     * * target: 存储当前监听的这个DOM元素对象
     * * ...
     */
    const [item] = changes;
    console.log({item});
}, { threshold: [0, 0.5, 1] });

// 监听某个DOM元素和可视窗口的交叉状态改变；unobserve移除监听
observer.observe(element1);
observer.observe(element2);         //连续监听多个DOM只触发一次回调
setTimeout(() => {
    observer.observe(element3);     //如果监听是分隔开的，每新监听一个元素都会触发执行一次回调
}, 1000);