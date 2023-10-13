import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Command input').click();
})

// tests for correct parameters given to view
test('tests correct parameters', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
});

// tests for extra parameters given to view
test('tests extra parameters', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('view extra');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    const mock_input = `Invalid view command: no arguments should be given`
    await expect(page.getByLabel('output-1')).toHaveText(mock_input)
});

// tests for no header files
test('tests no header', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./no_header_sports/path false');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
});

// tests incorrect header files
test('tests incorrect header', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./no_header_sports/path true');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('columnheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Football' })).toBeInViewport()
});

// tests incorrect no header files
test('tests incorrect no header', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path false');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('rowheader', { name: 'Sports' })).toBeInViewport()
});

// tests view file after double load
test('tests double load', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('load_file ./desserts/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('columnheader', { name: 'Dessert' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Chocolate' })).toBeInViewport()
});
