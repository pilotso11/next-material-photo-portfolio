import {Box, Stack} from '@mui/material'

export default function OGImage() {
    return <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(20,20,20,.9)'}}>
        <Stack direction='column' spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img
                src='/images/me.jpg' alt='me' style={{height: '70vh', width: '80vw', objectFit: 'cover'}}/></div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img
                src='/images/logo.png' alt='me'
                style={{height: '26vh', width: 'auto', objectFit: 'contain'}}/></div>
        </Stack>
    </Box>
}