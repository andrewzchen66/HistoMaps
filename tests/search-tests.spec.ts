import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Command input').click();
})

// tests for attribute in search
test('valid search', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('search 9');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Football' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Hockey' })).toBeInViewport()
});

// tests for attribute in search with column header
test('valid search with column header', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./desserts/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('search Fat 20%');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('columnheader', { name: 'Dessert' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Yoghurt' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Cake' })).toBeInViewport()
});

// tests for attribute in search with column index
test('valid search with column index', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('search Stat 9');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Hockey' })).toBeInViewport()
});

// tests for nonexistent search with headers
test('nonexistent search with headers', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('search State CA');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
});

// tests for search header on file without headers
test('column index file without header', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./no_header_sports/path false');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('search 1 10');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    const mock_input = `Invalid search command: ./no_header_sports/path has no headers`
    await expect(page.getByLabel('output-1')).toHaveText(mock_input)
});

// tests consecutive searches
test('tests consecutive searches', async ({ page }) => {
  
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');

    await page.getByLabel('Command input').fill('search State CA');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-1').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()

    await page.getByLabel('Command input').fill('search Stat 9');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-2').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
    await expect(page.getByLabel('output-2').getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByLabel('output-2').getByRole('rowheader', { name: 'Hockey' })).toBeInViewport()
});
