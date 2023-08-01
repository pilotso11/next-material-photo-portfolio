import {Box, Divider, Drawer, Tab, Tabs, Typography} from '@mui/material'
import Link from 'next/link'
import {gallery} from '@/data/galleryList'
import {grey} from '@mui/material/colors'

type menuDrawerProps = {
    item: string
    galleries: gallery[]
}

const drawerWidth = 150

// This renders the side menu drawer
// which has one entry for the index page (About)
// and one entry for each gallery.
// The gallery list must be loaded in staticProps and passed in
export default function MenuDrawer(props: menuDrawerProps) {
    // The drawer is a permanent drawer, so it is always visible.
    return <Drawer id="menu-drawer" variant="permanent" sx={{
        width: drawerWidth, flexShrink: 0,
        [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
    }}>
        {/* a box for the content - full height with small padding */}
        <Box sx={{p: 1, height: '100%'}}>
            {/*Site name*, with a little extra space between the divider to make it pretty */}
            <Typography variant="h6" noWrap component="div" align="center" >
                <Link style={{color: grey[600], textDecoration: 'none'}} href="/"> {process.env.name} </Link>
            </Typography>
            <Divider sx={{mt: 1}}/>

            {/*The tabs for the index page and each gallery*/}
            <Tabs
                value={props.item}
                variant="scrollable"
                scrollButtons="auto"
                orientation="vertical"
            >
                {/*The index page is a special case, so it is handled separately*/}
                <Tab value="about" label="About" href="/" component={Link} key="index" className="tab-link"/>

                {/*Each gallery is a tab, with the gallery key as the value, and the gallery title as the label*/}
                {/*We use the next Link to ensure smooth transitions between pages*/}
                {props.galleries.map((item) =>
                    <Tab label={item.title} value={item.key} href={item.url}
                         component={Link} key={item.key} className="tab-link"/>)}
            </Tabs>
        </Box>
    </Drawer>

}
