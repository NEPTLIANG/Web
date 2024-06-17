const imgElement = document.getElementById('img');
const imgContainer = document.getElementById('container');

/**
 * 图片懒加载
 * @returns {void}
 */
const lazy = () => {
    if (!(imgElement instanceof HTMLImageElement)) { return; }
    const realSrc = imgElement.getAttribute('real-src') || '';
    // 1. 传统方法：直接对原 img 元素进行加载，无法处理图片加载失败的情况
    // imgElement.src = realSrc;
    // imgElement.onload = () => {
    //     // 图片加载成功
    //     imgElement.style.opacity = '1';
    // };
    // 2. 改进方法：确保图片地址是正确的情况下，再给页面中的IMG元素赋值，防止因图片加载失败出现“裂图”
    const img = new Image();
    img.src = realSrc;
    img.onload = () => {
        // 图片加载成功
        imgElement.src = realSrc;
        imgElement.style.opacity = '1';
    }
    // 设置自定义属性：标记当前图片已经处理过延迟加载
    imgContainer.loaded = true;
};

/**
 * 计算是否加载（完全出现再加载）
 * @returns {void}
 */
const compute = () => {
    // 如果图片已经加载过，则不再进行以下处理
    if (
        imgContainer.loaded
            || !(imgContainer instanceof HTMLElement)
    ) { return; }
    // console.log('Computing');   //test: 如果不判断图片是否已经加载，则每次滚动仍都会执行以下操作
    const C = document.documentElement.clientHeight;
    const {
        top: B,
        bottom: A,
    } = imgContainer?.getBoundingClientRect();
    if (A <= C && B >= 0) {
        lazy();
    }
}

// 页面其他资源加载完后计算一次 & 页面滚动过程中随时计算
/**
 * * scroll事件会在浏览器滚动条滚动过程中触发，并且按照浏览器的最快反应时间（一般5～7ms）的频率触发
 *      例如：我们滚动100ms，按照5ms触发一次，一共触发20次
 *      触发频率太高了，造成了没必要的计算和性能消耗
 * * 此时我们需要降低触发频率（不是降低浏览器的触发频率，而是把compute函数执行的频率降下来）
 *      此操作称为“函数节流”
 */
window.onload = compute;
window.onscroll = compute;
// window.onscroll = utils.throttle(compute, 300);