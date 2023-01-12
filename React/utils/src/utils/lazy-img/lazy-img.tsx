import React, {
    useEffect
} from "react";

const LazyImg = attr => {
    const { conf = {} } = attr;
    // console.log(attr.size?.height ?? 200);

    const onImgLoaded = event => {
        // console.log(img.onload);
        const ele = event.target as HTMLElement;
        if (!ele) { return; } /* setTimeout(() => { */
        ele.style.opacity = '1';
        // console.log(ele.parentNode);
        if (!ele.parentNode) { return; }
        (ele.parentNode as HTMLElement).style.background = 'transparent';
        //     }
        // }/* , 1000)} */
    }

    const loadImg = img => {
        img.onload = onImgLoaded;
        const src = img.getAttribute('lazy-src') ?? '';
        img.src = src;
    }

    const judgeImgShowed = img => {
        const { top, bottom, height } = (img.parentNode as HTMLElement)?.getBoundingClientRect()
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
        const bottomBaseline = bottom - thresholdHeight;
        // console.log(attr.alt, { return: topBaseline < windowHeight && bottomBaseline > 0 })
        return topBaseline < windowHeight && bottomBaseline > 0;
    }

    const loadImgConditionally = () => {
        console.log('conditionally', window.scrollY)
        const imgList = Array.from(document.getElementsByTagName('img'));
        imgList.forEach(img => {
            // console.log(img.alt, { judge: judgeImgShowed(img) });
            if (!judgeImgShowed(img)) { return; }
            loadImg(img);
            // }
        });
    };

    console.log('construct');
    useEffect(() => {
        console.log(attr.alt, 'effect');
        window.addEventListener('load', () => {
            console.log('load');
            loadImgConditionally();
        });
        window.addEventListener('scroll', () => {
            console.log('scroll', window.scrollY)
            loadImgConditionally()
        });
    });

    return (
        <>
            <div className="util-lazy-img-box" style={attr.style}>
                <img alt={attr.alt} lazy-src={attr.lazySrc} />
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