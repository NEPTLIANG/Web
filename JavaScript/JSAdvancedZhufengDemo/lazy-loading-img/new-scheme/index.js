const imgContainer = document.querySelector('.container');
const imgElement = imgContainer.querySelector('img');
const lazy = () => {    // 延迟加载
    const realSrc = imgElement.getAttribute('real-src');
    imgElement.src = realSrc;
    imgElement.onload = () => {
        imgElement.style.opacity = '1';
    };
};

// 创建监听器监听图片元素的容器，控制延迟加载：无需再进行复杂运算、无需考虑函数节流……
const observer = new IntersectionObserver(([item]) => {
    if (!item.isIntersecting) { return; }
    // 完全出现在视口中时：进行延迟加载
    lazy();
    // 处理过的需要移除监听
    observer.unobserve(item.target);
}, { threshold: [1] });

observer.observe(imgContainer);