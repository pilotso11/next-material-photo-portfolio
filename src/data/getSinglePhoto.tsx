// Get metadata in the library format for a single photo
// because we are running serverside or precompiled we can
// inspect the image for its actual size.
// We make up a title from the file name - minus the sequence
import sizeOf from 'image-size'
import {capitalizeFirstLetter, textAfterDash, textUtils} from '@/data/textUtils'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import {webpOptions} from '@/data/webpOptions'

export async function verifyOrCreateImage(sizedImage: string, srcPath: string, width: number) {
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
        await sharp(srcPath)
            .resize( {width: width, height: width, fit: sharp.fit.inside})
            .webp(webpOptions)  // quality 75, interlaced, optimized
            .toFile(sizedImage)
            .then((info) => {
                console.log('Created sized image: ' + sizedImage + ": " + JSON.stringify(info))
            }).catch((err) => {
                console.log("Error resizing image: " + sizedImage + ": " + JSON.stringify(err))
            })
    }
}

// This is the data format for a single photo
export async function getSinglePhoto(captionWordCaps: boolean, sizes: number[], slug: string, src: string): Promise<{
    src: string;
    width: number;
    alt: string;
    description: string;
    title: string;
    srcSet: { src: string; width: number; height: number }[];
    height: number
}> {
    const srcUrl = '/gallery/' + slug + '/' + src + '.jpg'
    const srcPath= 'public' + srcUrl
    const dimensions = sizeOf(srcPath)

    // Create our caption from the file name
    const title = captionWordCaps ? textUtils(textAfterDash(src)) : capitalizeFirstLetter(textAfterDash(src))

    // Create a srcset that includes all the sizes
    let srcSet = await Promise.all(sizes.map(async (size) => {
        const sizedImageUrl = '/gallery/' + slug + '/resizes/' + src + '-' + size + '.webp'
        const sizedImagePath = 'public' + sizedImageUrl
        await verifyOrCreateImage(sizedImagePath, srcPath, size )
        const resizedDimensions = sizeOf(sizedImagePath)
        return {
            src: sizedImageUrl,
            width: resizedDimensions.width as number,
            height: resizedDimensions.height as number,
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
        src: '/gallery/' + slug + '/' + src + '.jpg',
        width: dimensions.width as number,
        height: dimensions.height as number,
        title: '',
        description: title,
        alt: title,
        srcSet: srcSet,
    }
}