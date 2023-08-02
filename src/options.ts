// Enable the lightbox captions options
// Captions are taken from the file name, everything after the first dash ('-')
export const showCaptions = true
// Capitalize the first letter of each word in the caption.
// If false only the first word is capitalized.
// ex:  'The quick brown fox' vs 'The Quick Brown Fox
export const captionWordCaps = true

// These are the fixed sizes we make available
// in practice this creates images of about 5k, 150k, 400k and 1.5mb in addition to the original source file.
// I usually make available a 4k source image which will come in at about 5-10mb.  These sizes present
// efficient downloading of thumbnails, blur on initial render using the 100x image, and sizes for mobile and various desktop
// screens with the largest sizes looking very good on 4k monitors.  We want to show off the photography after all!
export const sizes = [100, 512, 1024, 1800, 3600]

// File types we will accept as images
// This list can be amended to include other image types.
// We ignore case.
export const imageTypes = ['.jpg', '.jpeg', '.png', '.webp']
