import React, {
    useEffect
} from "react";

import type {
    Props,
    ImgElement,
    LoadImg,
    TestSrc,
    JudgeShowImg,
} from './types';


const LazyImg = (props: Props) => {
    const {
        conf = { threshold: 0 },
    } = props;

    /**
     * 加载图片
     * @param img img元素
     * @param lazySrc 真正的图片地址
     */
    const loadImg: LoadImg = (img, lazySrc) => {
        img.src = lazySrc;
        img.style.opacity = '1';
        img.loaded = true;
        if (!(img.parentNode instanceof HTMLDivElement)) { return; }
        img.parentNode.style.background = 'transparent';
    }

    /**
     * 测试图片地址是否有效
     * @param img img元素
     */
    const testSrc: TestSrc = img => {
        const lazySrc = img.getAttribute('lazy-src') ?? '';
        const imageForTest = new Image();
        imageForTest.onload = () => loadImg(img, lazySrc);
        imageForTest.src = lazySrc;
    }

    /**
     * 判断是否到时候加载图片
     * @param img img元素
     */
    const judgeShowImg: JudgeShowImg = img => {
        if (!(img?.parentNode instanceof HTMLDivElement)) { return; }
        const { top, bottom, height } = img.parentNode?.getBoundingClientRect?.() ?? {};
        const windowHeight = window.innerHeight;
        const thresholdHeight = height * (conf.threshold ?? 0);
        const topBaseline = top + thresholdHeight;
        const bottomBaseline = bottom - thresholdHeight;
        return topBaseline < windowHeight && bottomBaseline > 0;
    }

    /**
     * 有条件地加载图片
     */
    const loadImgConditionally = () => {
        const img = (document.getElementById(props.id)) as ImgElement;
        if (
            !(img instanceof HTMLImageElement)
                || img.loaded
                || !judgeShowImg(img)
        ) { return; }
        testSrc(img);
    };

    useEffect(() => {
        window.addEventListener('load', loadImgConditionally);
        window.addEventListener('scroll', loadImgConditionally);
    }, []);

    return (
        <>
            <div className="util-lazy-img-container" style={props.style} >
                <img
                    id={props.id}
                    alt={props.alt}
                    lazy-src={props.lazySrc}
                />
            </div>

            <style>{`
                .util-lazy-img-container {
                    height: ${conf.size?.height ?? '200px'};
                    width: ${conf.size?.width ?? '300px'};
                    background-color: #dfdfdf;
                    transition: background 1s;
                }
                .util-lazy-img-container img {
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    transition: opacity 1s /* linear 1s */;
                }
            `}</style>
        </>
    )
}

export default LazyImg;