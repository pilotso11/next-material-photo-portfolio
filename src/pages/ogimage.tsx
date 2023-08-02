/* eslint-disable @next/next/no-img-element */
import {Box, Stack} from '@mui/material'

export default function OGImage() {
    return <Box sx={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(20,20,20,.9)'}}>
        <Stack direction='row' spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '50%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src='/images/me.jpg' alt='me' style={{height: '70vh', width: '30vw', objectFit: 'cover'}}/></div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src='/images/logo.png' alt='me'
                style={{height: '26vh', width: 'auto', objectFit: 'contain'}}/></div>
        </Stack>
    </Box>
}