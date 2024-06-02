const imgElement = document.getElementById('');
const imgContainer = document.getElementById('');

/**
 * 图片懒加载
 * @returns {void}
 */
const lazy = function () {
    if (!(imgElement instanceof HTMLImageElement)) { return; }
    const realSrc: string = imgElement.getAttribute('real-src') || '';
    imgElement.src = realSrc;
    imgElement.onload = () => {
        imgElement.style.opacity = '1';
    };
};

/**
 * 计算是否加载（完全出现）
 * @returns {void}
 */
const computed = function () {
    if (!(imgContainer instanceof HTMLElement)) { return; }
    const C: number = document.documentElement.clientHeight;
    const {
        top: B,
        bottom: A,
    }: DOMRect = imgContainer?.getBoundingClientRect();
    if (A <= C && B >= 0) {
        lazy();
    }
}

// 页面其他资源加载完后计算一次 & 页面滚动过程中随时计算
window.onload = computed;
window.onscroll = computed;