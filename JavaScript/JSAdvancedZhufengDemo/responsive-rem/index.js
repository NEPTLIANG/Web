const DESIGN_WIDTH = 750;
const REM_SIZE = 16;

const computeResponsiveRem = () => {
    const { clientWidth } = document.documentElement;
    const ratio = clientWidth > DESIGN_WIDTH ?
        REM_SIZE : clientWidth / DESIGN_WIDTH * REM_SIZE;
    document.documentElement.style.fontSize = `${ratio}px`;
};

// 响应式设计——动态计算REM的换算比例
const makeResponsiveRem = () => {
    computeResponsiveRem();
    window.addEventListener('resize', computeResponsiveRem);
};

export default makeResponsiveRem;