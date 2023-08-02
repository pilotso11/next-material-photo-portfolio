import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('about page', async ({ page }) => {

    await page.getByRole('tab', {name: 'About'}).click();
    // Expects the URL to contain /.
    await expect(page).toHaveURL('http://localhost:3000/');

    await expect(page.getByRole('link', {name: 'My Name'})).toHaveText('My Name')

    await expect(page.getByRole('tab', {name: 'About'})).toHaveCount(1)
    await expect(page.getByRole('tab', {name: 'Nature'})).toHaveCount(1)
    await expect(page.getByRole('tab', {name: 'Signs'})).toHaveCount(1)
    await expect(page.getByRole('tab', {name: '03-people'})).toHaveCount(1)

    await expect(page.getByText('© 2023 Change Me')).toHaveCount(1)
    await expect(page.getByRole('img', {name: 'me'})).toBeVisible()
})

test('nature gallery', async ({ page }) => {
    await page.getByRole('tab', {name: 'Nature'}).click();
    // Expects the URL to contain nature.
    await expect(page).toHaveURL('http://localhost:3000/gallery/01-nature', {timeout: 30000});

    await expect(page.getByText('Isn\'t Nature Beautiful?')).toHaveCount(1)
    await expect(page.getByRole('img', {name: 'Autumn Tree From Below'})).toHaveCount(1)
    await expect(page.getByRole('img', {name: 'Snow On Blooming Crabapple Tree'})).toBeVisible()

    await page.getByRole('img', {name: 'Cliff Face With Broken Rocks'}).click();
    await page.locator('div').filter({hasText: /^Cliff Face With Broken Rocks$/}).nth(1).click();
})
test('signs gallery', async ({ page }) => {

    await page.getByRole('tab', { name: 'Signs' }).click();
    await expect(page).toHaveURL('http://localhost:3000/gallery/02-signs', {timeout: 30000});

    await expect(page.getByText('These are THE SIGNS - follow them')).toHaveCount(1)
    await expect(page.getByRole('img', { name: 'Sneezy Place Funny Street Sign' })).toHaveCount(1)

    await page.getByRole('tab', { name: '03-people' }).click();
    await expect(page.getByRole('img', { name: 'Children Looking At Zoo Exhibit' })).toHaveCount(1)

    await page.getByRole('tab', { name: 'About' }).click();
    await expect(page.getByRole('heading', { name: 'About Me' })).toHaveCount(1)

});