/*
 * Server side run once for each gallery
 * In here we need to load all the photos
 */
import fs from 'fs'
import path from 'path'
import {getSinglePhoto} from '@/data/getSinglePhoto'
import {galleryList} from '@/data/galleryList'
import {imageTypes} from '@/options'

// Helper function to determine if a file is an image
function isImage(file: string): boolean {
    const ext = path.extname(file).toLowerCase()
    return imageTypes.includes(ext)
}

// Find all images in a gallery and generate the list of photos for the album and lightbox views
export async function getGalleryImages(sizes: number[], captionWordCaps: boolean, slug: string | string[] | undefined) {
    let files = fs.readdirSync('public/gallery/' + slug)
    // Now we need to trim the list down to just our original images

    // exclude non images (i.e. our mdx files, and anything else dropped in the folder)
    files = files.filter((f) => isImage(f))

    // For base images we want just the core file name - no folder or extension
    const baseImages = files.map((file) => {
        const parsed = path.parse(file)
        return {name: parsed.name, ext: parsed.ext}
    })

    // Now turn the list of base names into a list of Photo data for rendering
    const list = await Promise.all(baseImages.map(async ({name, ext}) => {
        return await getSinglePhoto(captionWordCaps, sizes, slug as string, name, ext)
    }))

    // Get the list galleries, we need to pass this into the main component to create the side menu
    const galleries = galleryList()

    // Extract our current gallery, as we'll need its title
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