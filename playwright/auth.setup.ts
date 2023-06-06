import {test as setup} from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@test.ru');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', {name: 'Login'}).click();
    await page.waitForURL('/');

    // End of authentication steps.

    await page.context().storageState({path: authFile});
});
