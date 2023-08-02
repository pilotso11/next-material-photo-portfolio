import {describe, expect, test} from '@jest/globals';
import {getGalleryImages} from './getGalleryImages'
import {galleryList} from './galleryList'
import {capitalizeEveryWord, textAfterDash, capitalizeFirstLetter} from './textUtils'

describe('textUtils', () => {
  test('capitalizeFirstLetter', () => {
      expect(capitalizeFirstLetter('hello world')).toBe('Hello world')
      expect(capitalizeFirstLetter('HELLO world')).toBe('HELLO world')
      expect(capitalizeFirstLetter('hello')).toBe('Hello')
      expect(capitalizeFirstLetter('')).toBe('')
      expect(capitalizeFirstLetter('123')).toBe('123')
  })
    test('textAfterDash', () => {
        expect(textAfterDash('123-hello-world')).toBe('hello world')
        expect(textAfterDash('hello-world')).toBe('world')
        expect(textAfterDash('hello')).toBe('hello')
        expect(textAfterDash('')).toBe('')
    })
    test('capitalizeEveryWord', () => {
        expect(capitalizeEveryWord('hello world')).toBe('Hello World')
        expect(capitalizeEveryWord('HELLO world')).toBe('HELLO World')
        expect(capitalizeEveryWord('hello')).toBe('Hello')
        expect(capitalizeEveryWord('hello ')).toBe('Hello ')
        expect(capitalizeEveryWord('hello 123')).toBe('Hello 123')
        expect(capitalizeEveryWord('123 world')).toBe('123 World')
        expect(capitalizeEveryWord('')).toBe('')
    })
})

describe('Gallery images', () => {
    test('Gallery images handles various file types', async () => {
        await getGalleryImages([100, 512, 1024, 1800, 3600], true, '01-nature').then(({props}) => {
            expect(props).toBeDefined()
            expect(props.list).toBeDefined()
            expect(props.list.length).toBe(5)
            expect(props.list[0].srcSet?.length).toBe(6)
            expect(props.list[0].src).toBe('/gallery/01-nature/01-autumn-tree-from-below.jpg')
            expect((props.list[0] as any).description).toBe('Autumn Tree From Below')
            expect(props.list[0].srcSet).toBeDefined()
            expect(props.list[0].srcSet![0].src).toBe('/gallery/01-nature/resizes/01-autumn-tree-from-below-100.webp')
        })
    }, 10000)

    test('Gallery images creates srcSet', async () => {
        await getGalleryImages([100, 512, 1024, 1800, 3600], true, '01-nature').then(({props}) => {
            expect(props).toBeDefined()
            expect(props.list![0].srcSet).toBeDefined()
            expect(props.list![0].srcSet!.length).toBe(6)
            expect(props.list![0].src).toBe('/gallery/01-nature/01-autumn-tree-from-below.jpg')
            expect((props.list![0] as any).description).toBe('Autumn Tree From Below')
            expect(props.list![0].srcSet).toBeDefined()
            expect(props.list![0].srcSet![0].src).toBe('/gallery/01-nature/resizes/01-autumn-tree-from-below-100.webp')
        })

    })
})

describe('Gallery Lists', () => {
    test('Gallery list returns all galleries',  () => {
        const galleries = galleryList()
        expect(galleries).toBeDefined()
        expect(galleries.length).toBe(3)
    })

    test('Gallery list creates gallery without _index.mdx', () => {
        const galleries = galleryList()
        expect(galleries).toBeDefined()
        expect(galleries.length).toBe(3)
        expect(galleries[2].key).toBe('03-people')
    })

    test('Gallery metadata parsed from _index.mdx', () => {
        const galleries = galleryList()
        expect(galleries).toBeDefined()
        expect(galleries.length).toBe(3)
        expect(galleries[1].keywords).toBe('signs, traffic, funny, gallery, images, photography')
        expect(galleries[1].title).toBe('Signs')
        expect(galleries[1].description).toBe('This is a witty gallery of images of traffic signs.')
        expect(galleries[1].caption).toBe('These are THE SIGNS - follow them')
    })

})
