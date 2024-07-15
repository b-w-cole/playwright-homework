import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
  /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    await page.getByText('Owners').click()
    await page.getByText('Search').click()


});

test('Validate selected pet types from the list', async ({page}) => {
    /* 2. Add assertion of the "Owners" text displayed */
    // Validate that h2 says "Owners" as expected
    await expect(page.locator('h2')).toHaveText('Owners')

    /* 3. Select the first owner "George Franklin" */
    // Selecte the owner "George Franklin"
    await page.getByText('George Franklin').click()

    /* 4. Add the assertion for the owner "Name", the value "George Franklin" is displayed */
    // Validate that the owner name is reported as expected in the specific owner record
    await expect(page.locator('.ownerFullName')).toHaveText('George Franklin')
    
    /* 5. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Leo" */
    // Edit the pet
    await page.getByText('Leo').locator('..').getByText('Edit Pet').click()

    /* 6. Add assertion of "Pet" text displayed as header on the page */
    // Validate that h2 says "Pet" as expected
    await expect(page.locator('h2')).toHaveText('Pet')

    /* 7. Add the assertion "George Franklin" name is displayed in the "Owner" field */
    // Validate that the owner is correctly listed
    await expect(page.locator('#owner_name')).toHaveValue('George Franklin')

    /* 8. Add the assertion the value "cat" is displayed in the "Type" field */
    // Validate that "cat" is correctly listed in the textbox, in accordance with the dropdown
    const selectedPetType = page.locator('#type1')
    await expect(selectedPetType).toHaveValue('cat')

    /* 9. Using a loop, select the values from the drop-down one by one, and add the assertion, that every selected value from the drop-down is displayed in the "Type" field */
    const allOptions = await page.locator("option").allTextContents()
  
    /* Iterate through each option to validate that the pet is correctly listed in the textbox to the left */  
    for(const option of allOptions){
      // Click the option
      await page.selectOption('select', option)
      
      // Validate that the pet is correctly displayed in the textbox
      await expect(selectedPetType).toHaveValue(option)
    }
});


test('Validate the pet type update', async ({page}) => {
    /* 2. Add assertion of the "Owners" text displayed */
    // Validate that h2 says "Owners" as expected
    await expect(page.locator('h2')).toHaveText('Owners')

    /* 3. Select the owner "Eduardo Rodriquez" */
    // Select the owner "George Franklin"
    await page.getByText('Eduardo Rodriquez').click()

    /* 4. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Rosy" */
    // Edit the pet record for "Rosy"
    const editPetButton = page.getByText('Rosy').locator('..').getByText('Edit Pet')
    await editPetButton.click()
    
    /* 5. Add the assertion that name "Rosy" is displayed in the input field "Name" */
    // Validate that the name input field displays "Rosy"
    await expect(page.locator('#name')).toHaveValue('Rosy')

    /* 6. Add the assertion the value "dog" is displayed in the "Type" field */
    // Validate that the pet type field is "dog"
    const selectedPetType = page.locator('#type1')
    await expect(selectedPetType).toHaveValue('dog')

    /* 7. From the drop-down menu, select the value "bird" */
    // Change the pet type to "bird"
    await page.selectOption('select', 'bird')

    /* 8. On the "Pet detils" page, add the assertion the value "bird" is displayed in the "Type" field as well as drop-down input field */
    // Validate that "bird" is correctly listed in the textbox, in accordance with the dropdown
    await expect(selectedPetType).toHaveValue('bird')

    /* 9. Select "Update Pet" button */
    // Click the "Update Pet" button to update the record
    await page.getByText('Update Pet').click()

    /* 10. On the "Owner Information" page, add the assertion that pet "Rosy" has a new value of the Type "bird" */
    // Validate that Rosy's new pet type says "bird"
    const rosyPetType = page.getByText('Rosy').locator('..').locator('dd').last()
    await expect(rosyPetType).toHaveText('bird')
    
    /* 11. Select "Edit Pet" button one more time, and perform steps 6-10 to revert the selection of the pet type "bird" to its initial value "dog" */
    /* Iterate through the process to change Rosy's pet type back to "dog" */
    // Edit Rosy's pet record again
    await editPetButton.click()

    // Make sure the pet type still says bird
    await expect(selectedPetType).toHaveValue('bird')

    // Change the pet type back to dog
    await page.selectOption('select', 'dog')

    // Check that the selected pet type field says 'dog'
    await expect(selectedPetType).toHaveValue('dog')

    // Update the record
    await page.getByText('Update Pet').click()

    // Make sure Rosy's pet type is reverted back to 'dog'
    await expect(rosyPetType).toHaveText('dog')
});
