import React from 'react';
import styles from './index.module.scss';

const TimeLineItem = props => {
    const { children, icon, title, secondTitle, isStart, isEnding, endingLogo, style } = props;
    // console.log(props.children);

    return (
        <>
            {
                !isEnding ? (
                    <div className='item-box' style={style} >
                        <div className={styles.item} >
                            <div className={isStart ? 'start-line' : 'normal-line'} ></div>
                            <div className='content-box' >
                                <div className='icon' >{
                                    icon ?? (
                                        <div className='default-icon' />
                                    )
                                }</div>
                                <div className='right' >
                                    { title && (
                                        <div className='title' >{title}</div>
                                    )}
                                    { secondTitle && (
                                        <div className='second-title' >{secondTitle}</div>
                                    )}
                                    { children && (
                                        <div className='main-content' >{children}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.endItem} style={style} >
                        <div className='end-line'>
                            <div className='end-left' />
                            <div className='end-right' />
                        </div>
                        {
                            endingLogo ?? (
                                <div className='ending-logo' >
                                    Coming Soon...
                                </div>
                            )
                        }
                    </div>
                )
            }

            {/* <style>{`
                .item {
                    position: relative;
                }
                :global(.line) {
                    position: absolute;
                    left: 1rem;
                    width: 2px;
                    ${
                        isStart ? 
                            'top: 1rem; height: calc(100% - 1rem);'
                            :
                            'height: 100%;'
                    }
                    background-color: #bfbfbf;
                }
                .content-box {
                    display: flex;
                    padding: 1rem 0;
                }
                .icon {
                    z-index: 1;
                }
                .right {
                    padding-left: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .default-icon {
                    width: 2rem;
                    height: 2rem;
                    background-color: #3f3f3f;
                    border: 2px solid #fff;
                    border-radius: 2rem;
                }
                .end-box {
                    position: relative;
                    top: -0.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .end-line {
                    display: flex;
                    width: 100%;
                }
                .end-left {
                    margin-left: 1rem;
                    width: 1rem;
                    height: 1rem;
                    border: #bfbfbf solid;
                    border-width: 0 0 2px 2px;
                    border-bottom-left-radius: 0.5rem;
                }
                .end-right {
                    margin-top: 1rem;
                    width: calc(50% - 36px);
                    height: 1rem;
                    border: #bfbfbf solid;
                    border-width: 2px 2px 0 0;
                    border-top-right-radius: 0.5rem;
                }
                .ending-logo {
                    height: 2rem;
                    line-height: 2rem;
                    font-size: 1rem;
                    background-color: #3f3f3f;
                    padding: 0 1rem;
                    border: 2px solid #fff;
                    border-radius: 2rem;
                }
            `}</style> */}
        </>
    )
}

export default TimeLineItem;