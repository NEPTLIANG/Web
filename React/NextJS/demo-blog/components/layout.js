/*
 * @Author: NeptLiang
 * @Date: 2020-12-10 13:42:14
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-12-16 17:02:18
 * @Description: 布局组件（样式使用）
 */
import styles from './layout.module.css'  //要为其指定名称，例如styles

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )  //使用styles.container作为className
}