import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
});

test('Home page is opened and Welcome message is displayed', async ({page}) => {
    /* 1. Select the PET TYPES menu item in the navigation bar */
    // Navigate to the Pet Types page
    await page.getByText('Pet Types').click()

    /* 2. On the "Pet Types" page, add assertion of the "Pet Types" text displayed above the table with the list of pet types */
    // Validate that h2 says "Pet Types" as expected
    await expect(page.locator('h2')).toHaveText('Pet Types')
  
    /* 3. Click on "Add" button */
    // Click the 'Add' button to add a new pet type, 'pig'
    // There are a few elements with 'Add', so we specify 'button'
    await page.getByRole('button', {name: 'Add'}).click()

    /* 4. Add assertions of "New Pet Type" section title, "Name" header for the input field and the input field is visible */
    // Validate that the new page section has "New Pet Type" as the header
    // Expect that the new section header is below "Pet Types"
    await expect(page.locator('h2').nth(1)).toHaveText('New Pet Type')

    // Validate that the label for the input field is "Name"
    await expect(page.locator('label')).toHaveText('Name')
    
    // Validate that the input field is visible
    const input = page.locator('#name')
    await expect(input).toBeVisible()

    /* 5. Add a new pet type with the name "pig" and click "Save" button */
    // Adding 'pig' as the new pet type
    await input.click()
    await page.keyboard.type('pig')
    await page.getByText('Save').click()

    /* 6. Add assertion that the last item in the list of pet types has value of "pig" */
    // Validate that the last entry for pet type is 'pig'
    await expect(page.locator('table input').last()).toHaveValue('pig')
    
    /* 7. Click on "Delete" button for the "pig" pet type */
    // Delete the last entry ('pig')
    
    /* 8. Add assertion to validate the message of the dialog box "Delete the pet type?" */
    // Add a listener for the dialog box
    page.on('dialog', dialog => {
      // Assert that the correct message is displayed in the dialog box
      expect(dialog.message()).toEqual('Delete the pet type?')

      /* 9. Click on OK button on the dialog box */
      // Automatically accept this action
      dialog.accept()
    })

    // Remove the last entry, 'pig'
    await page.getByText('Delete').last().click()
    
    /* 10. Add assertion, that the last item in the list of pet types is not the "pig" */
    // Validate that 'pig' has been removed as a pet type
    await expect(page.getByRole('textbox').last()).not.toHaveValue('pig')
  });