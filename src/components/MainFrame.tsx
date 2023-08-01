import MetaHead, {metaData} from '@/components/MetaHead'
import MenuDrawer from '@/components/MenuDrawer'
import {Box} from '@mui/material'
import {gallery} from '@/data/galleryList'

type mainFrameProps = {
    children: React.ReactNode
    meta: metaData
    galleries: gallery[]
    index: string
}

// This is the main frame components that wraps the entire page
export default function MainFrame({children, meta, galleries, index}: mainFrameProps) {
    return <Box id="mainbox" sx={{display: 'flex'}}>
        {/* meta data */}
        <MetaHead meta={meta}/>

        {/*main menu as permanent drawer*/}
        <MenuDrawer item={index} galleries={galleries}/>

        {/* body content */}
        <Box id="main-content-box" sx={{flexGrow: 1, p: 1, m: 2, mt: 0}}>
            <Box className="page-content" id="album-box" sx={{flexGrow: 1, width: '100%'}}>
                {children}
            </Box>
        </Box>
    </Box>
}
