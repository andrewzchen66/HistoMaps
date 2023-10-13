import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
})

test('after I type into the input box, its text changes', async ({ page }) => {
    // Step 1: Navigate to a URL
    await page.goto('http://localhost:8000/');
  
    // Step 2: Interact with the page
    // Locate the element you are looking for
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('Awesome command');
  
    // Step 3: Assert something about the page
    // Assertions are done by using the expect() function
    const mock_input = `Awesome command`
    await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
  });
  
