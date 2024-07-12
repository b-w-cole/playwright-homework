import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
  /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    await page.locator('a', {hasText: 'Owners'}).click()
    await page.locator('a', {hasText: 'Search'}).click()

});

test('Validate selected pet types from the list', async ({page}) => {
    /* 2. Add assertion of the "Owners" text displayed */
    await expect(page.locator('h2')).toHaveText('Owners')
    /* 3. Select the first owner "George Franklin" */
    await page.getByRole('link', {name: 'George Franklin'}).click()

    /* 4. Add the assertion for the owner "Name", the value "George Franklin" is displayed */
    // get parent of element to get sibling
    
    /* 5. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Leo" */
    /* 6. Add assertion of "Pet" text displayed as header on the page */
    /* 7. Add the assertion "George Franklin" name is displayed in the "Owner" field */
    /* 8. Add the assertion the value "cat" is displayed in the "Type" field */
    /* 9. Using a loop, select the values from the drop-down one by one, and add the assertion, that every selected value from the drop-down is displayed in the "Type" field */

});
