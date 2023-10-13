import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Command input').click();
})

// tests for no parameters given to load_file
test('no parameters given to load_file', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    const mock_input = `Invalid load_file command: file path should be given as argument`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)
});

// tests for valid parameters given to load_file
test('tests for valid parameters', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
  
    // Assertion
    const mock_input = `Successfully loaded in csv file. Default true for containsHeader`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)
});

// tests for extra parameters given to load_file
test('tests for extra parameters', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path extra parameter');
    await page.getByLabel('Command input').press('Enter');
  
    // Assertion
    const mock_input = `Invalid load_file command: only accepted arguments are filepath and containsHeader`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)
});

// tests invalid file path given to load_file
test('tests invalid file', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./invalid/path');
    await page.getByLabel('Command input').press('Enter');
  
    // Assertion
    const mock_input = `Invalid file path. Default true for containsHeader`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)
});

// tests loading two different file paths
test('tests two file paths', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('load_file ./desserts/path');
    await page.getByLabel('Command input').press('Enter');
  
    // Assertion
    const mock_input = `Successfully loaded in csv file. Default true for containsHeader`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)
    await expect(page.getByLabel('output-1')).toHaveText(mock_input)
});

// tests false header
test('tests false header', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path false');
    await page.getByLabel('Command input').press('Enter');
  
    // Assertion
    const mock_input = `Successfully loaded in csv file`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)
});

// tests true header
test('tests true header', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path true');
    await page.getByLabel('Command input').press('Enter');
  
    // Assertion
    const mock_input = `Successfully loaded in csv file`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)
});

// tests verbose mode
test('tests verbose mode', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('load_file ./sports/path true');
    await page.getByLabel('Command input').press('Enter');
  
    // Assertion
    const mock_input0 = `Output: Successfully changed mode to verbose`
    const mock_input1 = `Output: Successfully loaded in csv file`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input0)
    await expect(page.getByLabel('output-1')).toHaveText(mock_input1)
});
