import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Command input').click();
})

// tests load view
test('load view', async ({ page }) => {
  
    // Interact with the page
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');

    // Assertion
    await expect(page.getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
});

// tests load search
test('load search', async ({ page }) => {
  
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

// tests load load
test('load load', async ({ page }) => {
  
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


// tests load view search
test('load view search', async ({ page }) => {
  
    // load
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    const mock_input = `Successfully loaded in csv file. Default true for containsHeader`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)

    // view
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-1').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()

    // search
    await page.getByLabel('Command input').fill('search 9');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-2').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
    await expect(page.getByLabel('output-2').getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByLabel('output-2').getByRole('rowheader', { name: 'Football' })).toBeInViewport()
    await expect(page.getByLabel('output-2').getByRole('rowheader', { name: 'Hockey' })).toBeInViewport()
});

// tests load view search load view search
test('load view search load view search', async ({ page }) => {
  
    // load
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    const mock_input = `Successfully loaded in csv file. Default true for containsHeader`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)

    // view
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-1').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()

    // search
    await page.getByLabel('Command input').fill('search 9');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-2').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
    await expect(page.getByLabel('output-2').getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByLabel('output-2').getByRole('rowheader', { name: 'Football' })).toBeInViewport()
    await expect(page.getByLabel('output-2').getByRole('rowheader', { name: 'Hockey' })).toBeInViewport()

    // load 
    await page.getByLabel('Command input').fill('load_file ./desserts/path');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-3')).toHaveText(mock_input)

    // view
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByRole('columnheader', { name: 'Dessert' })).toBeInViewport()
    await expect(page.getByRole('rowheader', { name: 'Chocolate' })).toBeInViewport()
   
    // search 
    await page.getByLabel('Command input').fill('search Fat 20%');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-5').getByRole('columnheader', { name: 'Dessert' })).toBeInViewport()
    await expect(page.getByLabel('output-5').getByRole('rowheader', { name: 'Yoghurt' })).toBeInViewport()
    await expect(page.getByLabel('output-5').getByRole('rowheader', { name: 'Cake' })).toBeInViewport()
});

// tests load view search in verbose
test('load view search verbose', async ({ page }) => {
  
    // mode
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByLabel('Command input').press('Enter');
    const mock_input0 = `Output: Successfully changed mode to verbose`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input0)

    // load
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    const mock_input1 = `Output: Successfully loaded in csv file. Default true for containsHeader`
    await expect(page.getByLabel('output-1')).toHaveText(mock_input1)

    // view
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-2').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()

    // search
    await page.getByLabel('Command input').fill('search 9');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-3').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
    await expect(page.getByLabel('output-3').getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByLabel('output-3').getByRole('rowheader', { name: 'Football' })).toBeInViewport()
    await expect(page.getByLabel('output-3').getByRole('rowheader', { name: 'Hockey' })).toBeInViewport()
});

// tests load view search in verbose, then in brief
test('load view search brief verbose', async ({ page }) => {
  
    // mode
    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByLabel('Command input').press('Enter');
    const mock_input0 = `Output: Successfully changed mode to verbose`
    await expect(page.getByLabel('output-0')).toHaveText(mock_input0)

    // load
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    const mock_input1 = `Output: Successfully loaded in csv file. Default true for containsHeader`
    await expect(page.getByLabel('output-1')).toHaveText(mock_input1)

    // view
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-2').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()

    // search
    await page.getByLabel('Command input').fill('search 9');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-3').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
    await expect(page.getByLabel('output-3').getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByLabel('output-3').getByRole('rowheader', { name: 'Football' })).toBeInViewport()
    await expect(page.getByLabel('output-3').getByRole('rowheader', { name: 'Hockey' })).toBeInViewport()

    // mode
    await page.getByLabel('Command input').fill('mode brief');
    await page.getByLabel('Command input').press('Enter');
    const mock_input4 = `Successfully changed mode to brief`
    await expect(page.getByLabel('output-4')).toHaveText(mock_input4)

    // load
    await page.getByLabel('Command input').fill('load_file ./sports/path');
    await page.getByLabel('Command input').press('Enter');
    const mock_input5 = `Successfully loaded in csv file. Default true for containsHeader`
    await expect(page.getByLabel('output-5')).toHaveText(mock_input5)

    // view
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-6').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()

    // search
    await page.getByLabel('Command input').fill('search 9');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-7').getByRole('columnheader', { name: 'Sports' })).toBeInViewport()
    await expect(page.getByLabel('output-7').getByRole('rowheader', { name: 'Basketball' })).toBeInViewport()
    await expect(page.getByLabel('output-7').getByRole('rowheader', { name: 'Football' })).toBeInViewport()
    await expect(page.getByLabel('output-7').getByRole('rowheader', { name: 'Hockey' })).toBeInViewport()
});

// tests for undefined commands
test('undefined commands', async ({ page }) => {
  
    await page.getByLabel('Command input').fill('loadidadida skrrrrrr');
    await page.getByLabel('Command input').press('Enter');
    const mock_input = "Invalid command: enter mode, load_file, view, or search"
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)

    await page.getByLabel('Command input').fill('load_csv ./empty');
    await page.getByLabel('Command input').press('Enter');
    await expect(page.getByLabel('output-1')).toHaveText(mock_input)
});