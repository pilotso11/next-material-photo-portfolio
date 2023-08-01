# NEXT.js Photography Portfolio Site
This is a photography portfolio site built with [NEXT.js](https://nextjs.org), 
[Material UI](https://mui.com), 
[react-photo-album](https://react-photo-album.com/), and
[yet-another-react-lightbox](https://yet-another-react-lightbox.com).

You can find a sample live site at [sophoto.uk](https://sophoto.uk).

They key features of this portfolio template are:
* An about/contact page
* Well defined gallery pages with a descriptive caption
* Reactive sizing that works well from mobile to desktop
* Image resizing to take advantage of the browsers ability to load smaller images when a full size is not needed
* A dark theme that can be customised
* And most importantly, the site is automatically generated from a set of images and a simple markdown file in each gallery folder. 
* No code is required to add new images.

## Getting Started
To get started, clone this repository and install the dependencies 
```sh
npm install
```

To start the development server run
```sh
npm run dev
```

To ensure that your images can properly resize you will need to install [ImageMagick](https://imagemagick.org/index.php).
```sh
brew install imagemagick
```

If you want to verify you have the right tools installed, you can run the following script
```sh
magick --version
```
You should get output similar to the following:
```
% magick --version
Version: ImageMagick 7.1.1-12 Q16-HDRI aarch64 21239 https://imagemagick.org
Copyright: (C) 1999 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI Modules OpenMP(5.0) 
Delegates (built-in): bzlib fontconfig freetype gslib heic jng jp2 jpeg jxl lcms lqr ltdl lzma openexr png ps raw tiff webp xml zlib
Compiler: gcc (4.2)
```

If you are on macos the resize script will use `sips` for the resizing.

## Customising the Site
You need to make at the least the following changes:
- in `next.config.js` edit the site URL
- in `pages/index.tsx` edit the site title, description, about content and meta data
- Create your own custom icons and replace the ones in the `public/images/icon.png`
- Replace the images in `public/images` with your own images (profile, logo etc.)
- Create your own gallery images and replace the ones in `public/images/gallery`
- In each gallery create an `_index.mdx` file to describe the gallery content
- Generate a variety of imager sizes using the script in `src/tools/resize.sh`.  You can run it with `npm run resize`.
- Run it in public/gallery.

## Deploying the Site
To deploy the site, run `npm run build` which will build and export the size.
You can then deploy the site using any static site hosting service. 
For example, I use cloudflare pages to host my site.  

## Adding a New Gallery or New Images
To add a new gallery, create a new folder in `public/images/gallery` and add your images to it.
Then, create an `_index.mdx` file in the folder to describe the gallery content.

To add images you just need to drop them in the appropriate gallery folder.

In both cases, rerun the `resize.sh` script to generate the new image sizes using You can run it with `npm run resize`.

## Customising the Theme
The theme is defined in `src/themes/Darktheme.tsx`. You can customise the theme by editing this file.
The fonts are loaded in `src/themes/fonts.ts` and used by the theme.
If you need more instructions on how to customise the theme, please refer to the [Material UI documentation](https://mui.com/material-ui/customization/theming/).

## Contents of the `_index.mdx` file
The `_index.mdx` file is used to describe the gallery content. It is written in markdown and can contain the following:
- `title` - the title of the gallery shown in the menu
- `description` - a description of the gallery used in meta tags (it should be longer and descriptive)
- `keywords` - a list of keywords used in meta tags
- `caption` - which is the header displayed on each gallery page
For example
```markdown
---
title: Gallery Title
description: A description of the gallery for metadata search engines
keywords: keyword1, keyword2, keyword3
caption: A caption for the gallery
---
The markdown section is currently unused.
```

## Open graph previews
If you want open graph previews, create them by taking screenshots (or using a tool) and
drop them in `public/open-graph/[path]`. The path should be the same as the gallery path.
The home page is `public/open-graph/about.png`.

## Contributions
If you have a suggested enhancement, feel free to submit a pull request.

## Attributions
Sample images from:
* https://www.photos-public-domain.com
* Eye icon from https://www.pngwing.com/en/free-png-hyliz
* Photographer: https://www.publicdomainpictures.net/en/view-image.php?image=4360&picture=female-photographer



## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Attribution is required.

Copyright (c) 2023 Seth Osher




