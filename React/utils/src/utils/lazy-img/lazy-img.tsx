import React, {
    useEffect
} from "react";

interface imgElement {
    // id: String
    loaded?: boolean,
};

const LazyImg = props => {
    const { conf = {} } = props;
    // console.log(props.size?.height ?? 200);

    const loadImg = (/* event, */ img, lazySrc) => {
        img.src = lazySrc;
        // const ele = event.target /* as HTMLElement */;
        console.log({/* ele, */ img});
        if (/* !ele */!img) { return; } /* setTimeout(() => { */
        /* ele */img.style.opacity = '1' /* String(1); */;
        /* Object.defineProperty( *//* ele. */img.loaded/* ', { value: */ = true /* }) */;
        if (!/* ele. */img.parentNode) { return; }
        /* ( *//* ele. */img.parentNode/*  as HTMLElement) */.style.background = 'transparent';
        //     }
        // }/* , 1000)} */
    }

    const testSrc = img => {
        const lazySrc = img.getAttribute('lazy-src') ?? '';
        const imageForTest = new Image();
        imageForTest.onload = (/* event */) => loadImg(/* event, */ img, lazySrc);
        imageForTest.src = lazySrc;
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
        // console.log('baseline', img.id, {top, height, conf: conf.threshold})
        const bottomBaseline = bottom - thresholdHeight;
        // console.log('judging', img.id, { return: topBaseline < windowHeight && bottomBaseline > 0 },
        //     topBaseline, windowHeight, bottomBaseline)
        return topBaseline < windowHeight && bottomBaseline > 0;
    }

    const loadImgConditionally = () => {
        // const imgList = Array.from(document.getElementsByTagName('img'));
        // console.log('conditionally', imgList.map(i => i.id))
        // imgList.forEach(img => {
        // const {
        //     id = props.id
        // } = props;
        const img = (document.getElementById(props.id) /* || { id: '' } */) as imgElement;
        if (
            !(img instanceof HTMLImageElement)
                || /* Object.getOwnPropertyDescriptor( */img.loaded/* ')?.value */
                || !judgeShowImg(img)
        ) { return; }
        // console.log({
        //     loaded: Object.getOwnPropertyDescriptor(img, 'loaded')?.value,
        //     img: img?.id
        // });
        testSrc(img);
        // });
    };

    // console.log('constructing');
    useEffect(() => {
        // console.log(props, 'effect');
        window.addEventListener('load', () => {
            // console.log('loaded');
            loadImgConditionally();
        });
        window.addEventListener('scroll', () => {
            // console.log('scrolled', window.scrollY)
            loadImgConditionally();
        });
    });

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