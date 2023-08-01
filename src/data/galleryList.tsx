import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type gallery = {
    title: string
    url: string
    key: string
    caption: string
    description: string
    keywords: string
}

// Helper function to enumerate the list of gallieries
// This uses fs.readdirSync to get the list of folders in the public/gallery folder.
// It can only be used in staticProps functions to ensure it runs server side
export const galleryList = (): gallery[] => {
    const files = fs.readdirSync('public/gallery')

    // For each folder we read _index.mdx for metadata
    // the body of the mdx file is unused
    return files.map((folder) => {
        const source = fs.readFileSync(
            path.join('public', 'gallery', folder, '_index.mdx'),
            'utf8'
        )
        // We use gray-matter to parse the metadata
        const {data} = matter(source)

        return {
            title: data.title ? data.title as string : folder,
            url: '/gallery/' + folder,
            key: folder,
            description: data.description ? data.description as string : folder + ' gallery',
            caption: data.caption ? data.caption as string : '',
            keywords: data.keywords ? data.keywords as string : '',
        }
    }).sort((a, b) => a.key.localeCompare(b.key))
}
