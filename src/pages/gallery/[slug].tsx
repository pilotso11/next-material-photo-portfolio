'use client'

import fs from 'fs'
import path from 'path'
import {GetStaticPropsContext} from 'next'
import {gallery, galleryList} from '@/data/galleryList'
import MainFrame from '@/components/MainFrame'
import {Photo, PhotoAlbum} from 'react-photo-album'
import {Typography, useMediaQuery} from '@mui/material'
import Lightbox from 'yet-another-react-lightbox'
import {useEffect, useState} from 'react'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import {darkTheme} from '@/themes/DarkTheme'
import {useWindowHeight} from '@react-hook/window-size/throttled'
import {getSinglePhoto} from '@/data/getSinglePhoto'

// Enable the lightbox captions options
// Captions are taken from the file name, everything after the first dash ('-')
const showCaptions = true
// Capitalize the first letter of each word in the caption.
// If false only the first word is capitalized.
// ex:  'The quick brown fox' vs 'The Quick Brown Fox
const captionWordCaps = true

// These are the fixed sizes we make available
// in practice this creates images of about 5k, 150k, 400k and 1.5mb in addition to the original source file.
// I usually make available a 4k source image which will come in at about 5-10mb.  These sizes present
// efficient downloading of thumbnails, blur on initial render using the 100x image, and sizes for mobile and various desktop
// screens with the largest sizes looking very good on 4k monitors.  We want to show off the photography after all!
const sizes = [100, 512, 1024, 1800, 3600]

// Enumerate the folders in /public/gallery as the list of galleries supplied by this slug page
export async function getStaticPaths() {
    const files = fs.readdirSync('public/gallery')
    return {
        paths: files.map((file) => ({
            params: {
                slug: path.parse(file).name
            },
        })),
        fallback: false,
    }
}

// Server side run once for each gallery
// In here we need to load all the photos
// and turn them into a gallery set
export async function getStaticProps(ctx: GetStaticPropsContext) {
    // The slug is our folder name
    const {slug} = ctx.params ? ctx.params : {slug: ''}
    // List all the images
    let files = fs.readdirSync('public/gallery/' + slug)
    // Now we need to trim the list down to just our original images
    // 1. exclude no .jpg
    files = files.filter((f) => f.endsWith('.jpg'))
    // 2. exclude any files that match our -[size].jpg
    for (let i = 0; i < sizes.length; i++) {
        files = files.filter(f => !f.endsWith('-' + sizes[i] + '.jpg'))
    }

    // For base images we want just the core file name - no folder or extension
    const baseImages = files.map((file) => {
        return path.parse(file).name
    })

    // Now turn the list of base names into a list of Photo data for rendering
    const list = await Promise.all(baseImages.map(async (name) => {
        return await getSinglePhoto(captionWordCaps, sizes, slug as string, name)
    }))

    // Get the list galleries, we need to pass this into the main component to create the side menu
    const galleries = galleryList()

    // Extract our current galliery, as we'll need its title
    const current = galleries.find((gallery) => gallery.key === slug)

    return {
        props: {
            slug,
            baseImages,
            galleries,
            current,
            list,
        },
    }
}

type galleryPageProps = {
    slug: string,
    baseImages: string[],
    galleries: gallery[],
    current: gallery,
    list: Photo[],
}

//
// This will render the gallery page
//
export default function GalleryPage({slug, galleries, current, list}: galleryPageProps) {

    // Produce our metadata from the parsed gallery mdx file
    const meta = {
        title: current.title,
        description: current.description,
        url: current.url,
        keywords: current.keywords,
    }

    // We use a mediaQuery to work out if we are lg breakpoint or more.
    // For lg and up we show thumbnails in the lightbox
    const isMdOrMore = useMediaQuery(darkTheme.breakpoints.up('lg'))

    // We need the window height to calculate the target height of the photo gallery imagers (3 rows)
    const height = useWindowHeight()

    // We need to ensure the target height is only computed in an effect, because window will not exist server side
    // (window would work in react, but not in next.js)
    const [targetHeight, setTargetHeight] = useState(100)

    // Here's the effect for the calculation
    useEffect(() => {
        setTargetHeight(height / 3)
    }, [height, setTargetHeight])

    // Selected photo for the lightbox
    // -1 means we're not in the lightbox and should show the album
    const [index, setIndex] = useState(-1)

    // Our set of lightbox plugins, set in the useEffect below
    const [lightboxPlugins, setLightboxPlugins] = useState([Fullscreen, Slideshow, Thumbnails, Zoom,])

    // Select lightbox options based on the showCaptions option above and larger screen size (show thumbnails)
    useEffect( () => {
        if (showCaptions && isMdOrMore) { // Captions and wide
            setLightboxPlugins([Fullscreen, Slideshow, Thumbnails, Captions, Zoom,])
        } else if (isMdOrMore) { // no captions and wide
            setLightboxPlugins([Fullscreen, Slideshow, Thumbnails, Zoom,])
        } else if (showCaptions) { // captions and small
            setLightboxPlugins([Fullscreen, Slideshow, Captions, Zoom,])
        } else { // no captions and small
            setLightboxPlugins([Fullscreen, Slideshow, Zoom,])
        }
    }, [isMdOrMore])

    // Render below - start with the main frame
    return <MainFrame meta={meta} galleries={galleries} index={slug}>
        {/* Div for out caption / title*/}
        <div id="caption" style={{marginTop: 3, marginBottom: 5}}>
            {current.caption ?
                <Typography variant="albumTitle">
                    {current.caption}
                </Typography> : <></>}
        </div>

        {/*only render the PhotoAlbum or the LightBox - in theory the lightbox renders on top of the album*/}
        {/*but showing only one or the other feels lighter on the client*/}
        {index < 0 ? <PhotoAlbum key={'album' + current.key} photos={list}
                                 layout="rows"
                                 targetRowHeight={targetHeight}
                                 spacing={10} padding={0}
                                 onClick={({index}) => setIndex(index)}
            // renderPhoto={renderPhoto}
        /> : <Lightbox key={'lightbox' + current.key}
                       slides={list}
                       open={index >= 0}
                       index={index}
                       close={() => setIndex(-1)}
                       plugins={lightboxPlugins}
                       captions={{showToggle: true, descriptionTextAlign: 'center'}}
        />}

    </MainFrame>
}
