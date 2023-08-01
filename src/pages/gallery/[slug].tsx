'use client'

import fs from 'fs'
import path from 'path'
import {GetStaticPropsContext} from 'next'
import {gallery, galleryList} from '@/data/galleryList'
import MainFrame from '@/components/MainFrame'
import {Photo, PhotoAlbum} from 'react-photo-album'
import {Typography, useMediaQuery} from '@mui/material'
import Lightbox from 'yet-another-react-lightbox'
import sizeOf from 'image-size'
import {useEffect, useState} from 'react'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import {darkTheme} from '@/themes/DarkTheme'
import {useWindowHeight} from '@react-hook/window-size/throttled'

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

// These are the fixed sizes we have available
const sizes = [100, 512, 1024, 1800, 3600]

// Capitalize the first letter of captions
function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// Get metadata in the library format for a single photo
// because we are running serverside or precompiled we can
// inspect the image for its actual size.
// We make up a title from the file name - minus the sequence
function getSinglePhoto(slug: string, src: string): {
    src: string;
    width: number;
    alt: string;
    description: string;
    title: string;
    srcSet: { src: string; width: number; height: number }[];
    height: number
} {
    const dimensions = sizeOf('public/gallery/' + slug + '/' + src + '.jpg')
    const title = capitalizeFirstLetter(src.substring(5).replace(/-/g, ' '))

    // Create a srcset that includes all the sizes
    let srcSet = sizes.map((size) => {
        return {
            src: '/gallery/' + slug + '/' + src + '-' + size + '.jpg ',
            width: size as number,
            height: size * dimensions.height! / dimensions.width!,
        }
    })
    // add the original and its size to the srcset
    srcSet = srcSet.concat([{
        src: '/gallery/' + slug + '/' + src + '.jpg',
        width: dimensions.width as number,
        height: dimensions.height as number,
    },])

    // Return the Photo data
    return {
        src: '/gallery/' + slug + '/' + src + '.jpg',
        width: dimensions.width as number,
        height: dimensions.height as number,
        title: title,
        description: title,
        alt: title,
        srcSet: srcSet,
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
    const list = baseImages.map((name) => {
        return getSinglePhoto(slug as string, name)
    })

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
                       plugins={
                           // Only render the thumbnails for large screen sizes
                           isMdOrMore ? [Fullscreen, Slideshow, Thumbnails, Zoom,]
                               : [Fullscreen, Slideshow, Zoom,]
                       }
        />}

    </MainFrame>
}