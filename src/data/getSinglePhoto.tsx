// Get metadata in the library format for a single photo
// because we are running serverside or precompiled we can
// inspect the image for its actual size.
// We make up a title from the file name - minus the sequence
import sizeOf from 'image-size'
import {capitalizeEveryWord, capitalizeFirstLetter, textAfterDash} from './textUtils'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import {webpOptions} from './webpOptions'

// convenience for width-height tuple
type WnH = { width: number, height: number }

async function verifyOrCreateImage(sizedImage: string, srcPath: string, width: number): Promise<WnH> {
    if (!fs.existsSync(sizedImage)) {
        console.log('Resized image needed: ' + sizedImage)
        const dir = path.parse(sizedImage).dir
        if(!fs.existsSync(dir)) {
            console.log('Creating folder: ' + dir)
            fs.mkdirSync(dir, {recursive: true})
        }

        // We resize with maxWidth, maxHeight and fit inside
        // this is equivalent to sips -Z 100 or magick-resize 100x100
        // noinspection JSSuspiciousNameCombination
        return sharp(srcPath)
            .withMetadata()
            .resize({width: width, height: width, fit: sharp.fit.inside})
            .webp(webpOptions)  // quality 75, interlaced, optimized
            .toFile(sizedImage)
            .then((data) => {
                console.log('Created sized image: ' + sizedImage)
                return {width: data.width as number, height: data.height as number}
            }).catch((err) => {
                console.log('Error creating sized image: ' + sizedImage)
                console.log(err)
                throw err
            })
    } else {
        const dimensions = sizeOf(sizedImage)
        return {width: dimensions.width as number, height: dimensions.height as number}
    }

}

// This is the data format for a single photo
export async function getSinglePhoto(captionWordCaps: boolean, sizes: number[], slug: string, src: string, ext: string): Promise<{
    src: string;
    width: number;
    alt: string;
    description: string;
    title: string;
    srcSet: { src: string; width: number; height: number }[];
    height: number
}> {
    const srcUrl = '/gallery/' + slug + '/' + src + ext
    const srcPath = 'public' + srcUrl
    const dimensions = sizeOf(srcPath)

    // Create our caption from the file name
    const title = captionWordCaps ? capitalizeEveryWord(textAfterDash(src)) : capitalizeFirstLetter(textAfterDash(src))

    // Create a srcset that includes all the sizes
    let srcSet = await Promise.all(sizes.map(async (size) => {
        const sizedImageUrl = '/gallery/' + slug + '/resizes/' + src + '-' + size + '.webp'
        const sizedImagePath = 'public' + sizedImageUrl
        const details = await verifyOrCreateImage(sizedImagePath, srcPath, size)
        return {
            src: sizedImageUrl,
            width: details.width,
            height: details.height,
        }
    }))

    // add the original and its size to the srcset
    srcSet = srcSet.concat([{
        src: srcUrl,
        width: dimensions.width as number,
        height: dimensions.height as number,
    },])

    // Return the Photo data
    return {
        src: '/gallery/' + slug + '/' + src + ext,
        width: dimensions.width as number,
        height: dimensions.height as number,
        title: '',
        description: title,
        alt: title,
        srcSet: srcSet,
    }
}