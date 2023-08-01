'use client'
// noinspection JSUnusedGlobalSymbols
import {createTheme, responsiveFontSizes} from '@mui/material'
import {quicksand} from '@/themes/fonts'

export const darkTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: 'dark',
    },
    typography: {
        albumTitle: {
            fontFamily: quicksand.style.fontFamily,
            fontSize: '2rem',
        },
        // Lora, Cardo
        fontFamily: quicksand.style.fontFamily,
        fontSize: 14,
    },
}), {factor: 2})

declare module '@mui/material/styles' {
    interface TypographyVariants {
        albumTitle: React.CSSProperties;
        nameTitle: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        albumTitle?: React.CSSProperties;
        nameTitle?: React.CSSProperties;
    }
}
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        albumTitle: true;
        nameTitle: true;
    }
}
