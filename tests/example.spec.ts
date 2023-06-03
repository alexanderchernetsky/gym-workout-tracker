import {test, expect} from '@playwright/test';

// todo: remove examples
test('has title', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', {name: 'Get started'}).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});

test('login (happy path)', async ({page}) => {
    await page.goto('http://localhost:3000/');
    await page.getByLabel('Email *').fill('test@test.ru');
    await page.getByLabel('Password *').fill('123123');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('heading', {name: 'Start Workout'})).toBeVisible();
});

test('login (validation)', async ({page}) => {
    await page.goto('http://localhost:3000/');
    await page.getByLabel('Email *').fill('123@123');
    await page.getByLabel('Password *').fill('123');
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Password must have at least 5 characters')).toBeVisible();
});

test('register (happy path)', async ({page}) => {
    await page.goto('http://localhost:3000/');
    await page.getByText('Sign Up!').click();
    await expect(page).toHaveURL('http://localhost:3000/register');
    await page.getByLabel('Username *').click();
    await page.getByLabel('Username *').fill('testuser');
    await page.getByLabel('Email *').click();
    await page.getByLabel('Email *').fill('test@test.ru');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('123123');
    await page.getByRole('button', {name: 'Register'}).click();
    await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
    await expect(page).toHaveURL('http://localhost:3000/login');
});
