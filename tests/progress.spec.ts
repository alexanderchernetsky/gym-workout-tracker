import {expect, test} from '@playwright/test';

const NUMBER_OF_PROGRESS_ENTRIES = 1;

test.describe('progress page', () => {
    test('should navigate to the progress page and display progress entries', async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', {name: 'Progress'}).click();
        await expect(page).toHaveURL('/progress');
        await expect(page.getByRole('heading', {name: 'Progress', exact: true})).toBeVisible();
        await expect(page.getByRole('heading', {name: 'Entries', exact: true})).toBeVisible();
        await expect(page.getByTestId('progress-entry-card')).toHaveCount(NUMBER_OF_PROGRESS_ENTRIES);
    });

    test('should create a new progress entry', async ({page}) => {
        await page.goto('/progress');
        await page.getByText('Add new progress entry').click();
        await expect(page).toHaveURL('/progress/create');
        // todo: complete the test once BE work is done
    });

    // todo test('should edit a new progress entry')
    // todo test('should delete a new progress entry')
});
