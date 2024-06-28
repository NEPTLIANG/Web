interface Props {
    id: string,
    lazySrc: string,
    alt?: string,
    conf?: {
        threshold?: number,
        size?: {
            width?: number | string,
            height?: number | string,
        }
    },
    style?: unknown,
}
interface ImgElement extends HTMLImageElement {
    loaded?: boolean,
}
type LoadImg = (img: ImgElement, lazySrc: string) => void
type TestSrc = (img: ImgElement) => void
type JudgeShowImg = (img: ImgElement) => boolean

export type {
    Props,
    ImgElement,
    LoadImg,
    TestSrc,
    JudgeShowImg,
}