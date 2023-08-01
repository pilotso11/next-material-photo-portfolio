import Image from 'next/image'
import {directImageLoader} from '@/components/loader'

type percentImageProps = {
    src: string
    alt: string
    blur: string
    width: string
    height: string
}

// Wraps next/image in a div to use percentage width and height
export default function PercentImage(props: percentImageProps) {
    return <div className="percent-image" style={{
        position: 'relative',
        display: 'flex',
        objectFit: 'contain',
        width: props.width,
        height: props.height
    }}>
        <Image src={props.src} alt={props.alt} fill placeholder="blur" blurDataURL={props.blur}
               loader={directImageLoader} style={{objectFit: 'contain'}} unoptimized/>
    </div>
}