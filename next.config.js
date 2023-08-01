/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SITE_URL: 'https://next-material-photo-portfolio.pages.dev',
        name: 'My Name'
    },
    images: {
        imageSizes: [100, 512, 1024, 1800, 3600],
        unoptimized: true,
    },
    output: 'export',
}

module.exports = nextConfig
