import React, {
    useEffect
} from "react";

interface imgElement { alt: String };

const LazyImg = props => {
    const { conf = {} } = props;
    // console.log(props.size?.height ?? 200);

    const onImgLoaded = event => {
        // console.log(img.onload);
        const ele = event.target /* as HTMLElement */;
        if (!ele) { return; } /* setTimeout(() => { */
        ele.style.opacity = String(1);      //'1';
        Object.defineProperty(ele, 'loaded', { value: true });
        if (!ele.parentNode) { return; }
        /* ( */ele.parentNode/*  as HTMLElement) */.style.background = 'transparent';
        //     }
        // }/* , 1000)} */
    }

    const loadImg = img => {
        img.onload = onImgLoaded;
        img.src = img.getAttribute('lazy-src') ?? '';
    }

    const judgeShowImg = img => {
        const { top, bottom, height } = /* ( */img.parentNode/*  as HTMLElement) */?.getBoundingClientRect();
        // console.log(
        //     /* window.scrollY, 
        //     img.offsetTop, */ 
        //     img.getBoundingClientRect()/* .bottom */ /* > 0 */, 
        //     window.innerHeight, 
        //     img
        // );
        const windowHeight = window.innerHeight;
        const thresholdHeight = height * (conf.threshold ?? 0);
        const topBaseline = top + thresholdHeight;
        // console.log('baseline', img.alt, {top, height, conf: conf.threshold})
        const bottomBaseline = bottom - thresholdHeight;
        console.log('judging', img.alt, { return: topBaseline < windowHeight && bottomBaseline > 0 },
            topBaseline, windowHeight, bottomBaseline)
        return topBaseline < windowHeight && bottomBaseline > 0;
    }

    const loadImgConditionally = () => {
        // const imgList = Array.from(document.getElementsByTagName('img'));
        // console.log('conditionally', imgList.map(i => i.alt))
        // imgList.forEach(img => {
        const {
            id = props.alt
        } = props;
        const img = (document.getElementById(id) || { alt: '' }) as imgElement;
        if (
            Object.getOwnPropertyDescriptor(img, 'loaded')?.value
                || !judgeShowImg(img)
        ) { return; }
        console.log({loaded: Object.getOwnPropertyDescriptor(img, 'loaded')?.value, img: img?.alt});
        loadImg(img);
        // });
    };

    console.log('constructing');
    useEffect(() => {
        console.log(props.alt, 'effect');
        window.addEventListener('load', () => {
            console.log('loaded');
            loadImgConditionally();
        });
        window.addEventListener('scroll', () => {
            console.log('scrolled', window.scrollY)
            loadImgConditionally();
        });
    });

    return (
        <>
            <div className="util-lazy-img-box" style={props.style} >
                <img 
                    id={props.id ?? props.alt} 
                    alt={props.alt} 
                    lazy-src={props.lazySrc} 
                />
            </div>

            <style>{`
                .util-lazy-img-box {
                    height: ${conf.size?.height ?? '200px'};
                    width: ${conf.size?.width ?? '300px'};
                    background-color: #dfdfdf;
                    transition: background 1s;
                }
                .util-lazy-img-box img {
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