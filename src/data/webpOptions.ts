/* eslint-disable */
// @ts-nocheck
//
import {WebpOptions} from 'sharp'

// This is is in a separate file to workaround the missing preset type in sharp.
// https://github.com/lovell/sharp/issues/3747
// todo: remove this file when the issue is resolved
export const webpOptions: WebpOptions = {
    quality: 75,
    preset: 'photo',
}
