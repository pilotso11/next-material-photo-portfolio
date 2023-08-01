import '@/themes/global.css'

import * as React from 'react'
import Head from 'next/head'
import {AppProps} from 'next/app'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {CacheProvider, EmotionCache} from '@emotion/react'
import createEmotionCache from '@/themes/createEmotionCache'
import {darkTheme} from '@/themes/DarkTheme'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}
// Most of this is boilerplate to ensure tht mui / emotion work with next.js
// This is where the document theme goes
// as well as the emotion cache
export default function MyApp(props: MyAppProps) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props
    return (
        <>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <ThemeProvider theme={darkTheme}>
                    {/*CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.*/}
                    <CssBaseline/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </>
    )
}