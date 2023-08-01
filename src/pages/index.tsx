import {Grid, Stack, Typography} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PercentImage from '@/components/PercentImage'
import MainFrame from '@/components/MainFrame'
import {InferGetStaticPropsType} from 'next'
import {galleryList} from '@/data/galleryList'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'

// We need to load the list of galleries from the file system
// This is done at build time
export async function getStaticProps() {
    const galleries = galleryList()
    return {
        props: {
            galleries
        }
    }
}

// This is our home / about me page
export default function Index({galleries}: InferGetStaticPropsType<typeof getStaticProps>) {
    const meta = {
        title: 'My Photography',
        description: 'Artistic photography portfolio by Me',
        url: '/about',
        keywords: 'photography, photos, art, candid street photography, landscape photography, travel photography, black and white photography',
    }

    const date = new Date()
    return <MainFrame meta={meta} galleries={galleries} index="about">
        <Grid container spacing={0} sx={{display: 'flex', width: '100%'}}>
            <Grid item sm={8}>
                {/* Page title */}
                <Typography variant="h2">About Me</Typography>

                {/* Page content */}
                <Typography variant="body1">
                    I am an amateur photographer based in London, England.
                </Typography>
                <br/>
                <Typography variant="body1">
                    I started taking pictures with my Poloroid camera when I was 10 years old.
                    I've now spent most of my life savings on camera equipment.  If I didn't take pictures
                    I cold probably retire now.
                </Typography>
                <br/>
                <Typography variant="body1">
                    Instead I spend all of my time searching for the perfect shot, even if it means going to the ends
                    of the earth.
                </Typography>
                <br/>
                <Typography variant="body1">
                    Higher quality and images without watermarks are available.
                    For prints or usage please contact me at <a style={{color: 'coral'}}
                                                                href="mailto:contact@changeme.com">contact@changeme.com</a>.
                </Typography>
                <br/>
            </Grid>

            {/*My photo is shown on the left, except for small breaks where it will be scaked*/}
            <Grid item xs={12} sm={4} sx={{minHeight: '15vh'}}>
                <PercentImage src="/images/me.jpg" alt="me" blur="/images/me-preview.jpg" width="80%"
                              height="100%"/>
            </Grid>

            {/*Out social links and signature / watermark are shown side by side, except for very small breaks where they will be stacked*/}
            <Grid item xs={12} sm={4} sx={{alignContent: 'center', display: 'flex', justifyContent: 'flex-start'}}>
                <Stack direction="column">
                    <Stack direction="row" spacing={1} sx={{m: 1}}>
                        <InstagramIcon/>
                        <div><a style={{color: 'coral'}} target="_insta"
                                href="https://www.instagram.com/changeme/">changeme</a></div>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{m: 1}}>
                        <LinkedInIcon/> <a style={{color: 'coral'}} target="_linkedin"
                                           href="https://www.linkedin.com/in/change-me/">change-me</a>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{m: 1}}>
                        <PersonSearchIcon/> <a style={{color: 'coral'}} target="_linkedin"
                                               href="https://some-other-page.com/">some-other-page.com</a>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={12} sm={4}
                  sx={{minHeight: '15vh', alignContent: 'center', display: 'flex', justifyContent: 'flex-start'}}>
                <PercentImage src="/images/logo.png" alt="My Logo"
                              blur="/images/logo-preview.png" width="80%" height="100%"/>
            </Grid>
            {/* Copyright at the bottom */}
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Typography variant="caption">&copy; {date.getFullYear()} Change Me</Typography>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Typography variant="caption">Based on a template by Seth Osher.
                    You can get it <a href='https://github.com/pilotso11/next-material-photo-portfolio/'>here.</a></Typography>
            </Grid>
        </Grid>
    </MainFrame>
}