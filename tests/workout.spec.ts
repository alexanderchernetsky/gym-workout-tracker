import {expect, test} from '@playwright/test';

test('home page', async ({page}) => {
    await page.goto('/');
    await expect(page.getByRole('heading', {name: 'Start Workout'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Start an empty workout'})).toBeVisible();
});
