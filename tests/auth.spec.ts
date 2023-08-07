import {test, expect} from '@playwright/test';

test.describe('login', () => {
    test('login (happy path)', async ({page}) => {
        await page.goto('/login');
        await page.getByLabel('Email *').fill('test@test.by');
        await page.getByLabel('Password *').fill('123123');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page).toHaveURL('/');
        await expect(page.getByRole('heading', {name: 'Start Workout'})).toBeVisible();
    });

    test('login (validation)', async ({page}) => {
        await page.goto('/login');
        await page.getByLabel('Email *').fill('123@123');
        await page.getByLabel('Password *').fill('123');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.getByText('Invalid email address')).toBeVisible();
        await expect(page.getByText('Password must have at least 5 characters')).toBeVisible();
    });
});

test.describe('registration', () => {
    // todo: this will fail with the error 'Error: user with such email or username already exists'. You need to cleanup e.g. https://playwright.dev/docs/test-global-setup-teardown ?
    test.skip('register (happy path)', async ({page}) => {
        await page.goto('/login');
        await page.getByText('Sign Up!').click();
        await expect(page).toHaveURL('/register');
        await page.getByLabel('Username *').click();
        await page.getByLabel('Username *').fill('testuser');
        await page.getByLabel('Email *').click();
        await page.getByLabel('Email *').fill('test@test.ru');
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill('123123');
        await page.getByRole('button', {name: 'Register'}).click();
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
        await expect(page).toHaveURL('/login');
    });

    test('register (validation)', async ({page}) => {
        await page.goto('/register');
        await page.getByLabel('Username *').click();
        await page.getByLabel('Username *').fill('test user');
        await page.getByLabel('Email *').click();
        await page.getByLabel('Email *').fill('test@test');
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill('123');
        await page.getByRole('button', {name: 'Register'}).click();
        await expect(page.getByText('Invalid email address')).toBeVisible();
        await expect(page.getByText('Password must have at least 5 characters')).toBeVisible();
        await expect(page.getByText('Username can only contain alphanumeric characters, dots, underscores')).toBeVisible();
    });
});
