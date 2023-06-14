import {expect, test} from '@playwright/test';

const NUMBER_OF_DEFAULT_TEMPLATES = 3;

test.describe('home page (workout)', () => {
    test('should show page contents including example templates', async ({page}) => {
        await page.goto('/');
        await expect(page.getByRole('heading', {name: 'Start Workout'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Start an empty workout'})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'Start Workout'})).toBeVisible();
        // check that there are 3 example templates on the page
        await expect(page.getByTestId('home-page-example-templates').getByTestId('workout-template-card')).toHaveCount(NUMBER_OF_DEFAULT_TEMPLATES);
    });

    // todo: add additional tests when all functionality on the home page is complete
});
