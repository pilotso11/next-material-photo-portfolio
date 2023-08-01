import path from 'path'
import {ImageLoader} from 'next/image'

// Custom next.js loaders, to allow for custom image sizes
// Loads images as name-width.jpg
// The srcSet seems to do a better job IMHO
export const widthImageLoader: ImageLoader = ({src, width, quality}) => {
    console.debug('Width: ' + src + ' ' + width + ' ' + quality)
    const parts = path.parse(src)

    const target = parts.dir + '/' + parts.name + +'-' + width + '.' + parts.ext
    console.debug(target)
    return target
}

// Just loads the src, ignore any size/quality measure
export const directImageLoader: ImageLoader = ({src,}) => {
    console.debug('Direct: ' + src)
    return src
}
