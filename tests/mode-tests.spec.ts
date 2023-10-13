import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');
    await page.getByLabel('Command input').click();
})

// test initial mode is brief
test('initial mode is brief', async ({ page }) => {
  
    await page.getByLabel('Command input').fill('random command');
    await page.getByLabel('Command input').press('Enter');
    const mock_input = "Invalid command: enter mode, load_file, view, or search"
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)
});

// test invalid mode parameter
test('invalid mode parameter', async ({ page }) => {
    await page.getByLabel('Command input').fill('mode super verbose');
    await page.getByLabel('Command input').press('Enter');
    const mock_input1 = "Invalid mode command: too many arguments provided"
    await expect(page.getByLabel('output-0')).toHaveText(mock_input1)

    await page.getByLabel('Command input').fill('mode briefly');
    await page.getByLabel('Command input').press('Enter');
    const mock_input2 = "Invalid mode command: enter brief or verbose"
    await expect(page.getByLabel('output-1')).toHaveText(mock_input2)

    await page.getByLabel('Command input').fill('mode');
    await page.getByLabel('Command input').press('Enter');
    const mock_input3 = "Invalid mode command: must provide brief or verbose argument"
    await expect(page.getByLabel('output-2')).toHaveText(mock_input3)

});

// test switching between brief and verbose
test('switching between modes', async ({ page }) => {
    await page.getByLabel('Command input').fill('mode brief');
    await page.getByLabel('Command input').press('Enter');
    const mock_input = "Successfully changed mode to brief"
    await expect(page.getByLabel('output-0')).toHaveText(mock_input)

    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByLabel('Command input').press('Enter');
    const mock_input2 = "Output: Successfully changed mode to verbose"
    await expect(page.getByLabel('output-1')).toHaveText(mock_input2)

    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByLabel('Command input').press('Enter');
    const mock_input3 = "Output: Successfully changed mode to verbose"
    await expect(page.getByLabel('output-2')).toHaveText(mock_input3)

    await page.getByLabel('Command input').fill('mode brief');
    await page.getByLabel('Command input').press('Enter');
    const mock_input4 = "Successfully changed mode to brief"
    await expect(page.getByLabel('output-3')).toHaveText(mock_input4)

    await page.getByLabel('Command input').fill('mode verbose');
    await page.getByLabel('Command input').press('Enter');
    const mock_input5 = "Output: Successfully changed mode to verbose"
    await expect(page.getByLabel('output-4')).toHaveText(mock_input5)
});