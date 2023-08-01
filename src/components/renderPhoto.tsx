import {RenderPhotoProps} from 'react-photo-album'
import Image from 'next/image'
import {widthImageLoader} from '@/components/loader'

// This is a custom photo render for <PhotoAlbum> that uses
// the next.js <Image> tag.
// Unoptimized is used because we're creating a static page, but we've supplied
// a custom loader.
export const renderPhoto = (props: RenderPhotoProps) => {
    // console.log(props)

    // By default, use the same image for preview and the full image
    // just in case we don't have a full srcSet
    let preview = props.photo.src
    let full = preview

    // If we have a full srcSet, the first is our preview and the last is our full image
    if (props.photo.srcSet) {
        preview = props.photo.srcSet[0].src
        full = props.photo.srcSet[props.photo.srcSet.length - 1].src
    }

    return <Image src={full}
                  blurDataURL={preview}
                  placeholder="blur"
                  alt={props.imageProps.alt}
                  height={props.layout.height}
                  width={props.layout.width}
                  style={props.imageProps.style}
                  onClick={props.imageProps.onClick}
                  className={props.imageProps.className}
                  loader={widthImageLoader}
                  unoptimized
    />
}