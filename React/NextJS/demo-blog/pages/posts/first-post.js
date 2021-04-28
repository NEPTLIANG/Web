/*
 * @Author: NeptLiang
 * @Date: 2020-12-10 11:02:57
 * @LastEditors: NeptLiang
 * @LastEditTime: 2020-12-10 13:46:58
 * @Description: NextJS Demo(Blog)
 */
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/layout'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
                {/* 另：外部链接用<a>不用Link */}
            </h2>
        </Layout>
    )
}