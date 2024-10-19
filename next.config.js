/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SITE_URL: 'https://next-material-photo-portfolio.pages.dev',
        name: 'My Name'
    },
    images: {
        unoptimized: true,
    },
    output: 'export',
    staticPageGenerationTimeout: 300,
}

module.exports = nextConfig
