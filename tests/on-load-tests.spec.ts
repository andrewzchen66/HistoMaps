import { test, expect } from '@playwright/test';

// tests that there is an input bar on page load
test('on page load, input bar', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await expect(page.getByLabel('Command input')).toBeVisible()
})

// tests that there is a mock heading on page load
test('on page load, mock heading', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await expect(page.getByRole('heading', { name: 'Mock' })).toBeVisible()
})

// tests that there is submit button on page load
test('on page load, submit button', async ({ page }) => {
    await page.goto('http://localhost:8000/');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
})