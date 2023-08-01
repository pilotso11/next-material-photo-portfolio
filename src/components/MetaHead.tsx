import Head from 'next/head'

export type metaData = {
    title: string
    description?: string
    keywords?: string
    url?: string

}
export type metaHeadProps = {
    meta: metaData
}

// Utility component to set the meta tags for a page
export default function MetaHead(props: metaHeadProps) {
    return <Head>
        <title>{props.meta.title}</title>
        {props.meta.description && <meta name="description" content={props.meta.description}/>}
        {props.meta.keywords && <meta name="keywords" content={props.meta.keywords}/>}
        {props.meta.url && <link rel="canonical" href={process.env.SITE_URL + props.meta.url}/>}
        {props.meta.url && <meta property="og:image"
                                 content={process.env.SITE_URL + '/open-graph' + (props.meta.url == '/' ? '/index' : props.meta.url) + '.png'}/>}
        <meta property="og:image:alt" content="..."/>
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
    </Head>
}