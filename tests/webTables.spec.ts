import { test, expect } from '@playwright/test';
import { spec } from 'node:test/reporters';

const timeout = 7000

test.beforeEach(async ({ page }) => {
    await page.goto('/')

});

test('Validate the pet name city of the owner', async ({ page }) => {
    /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    // Navigate to the owners table
    await page.getByText('Owners').click()
    await page.getByText('Search').click()

    /* 2. In the list of Owners, locate the owner by the name "Jeff Black". 
    Add the assertions that this owner is from the city of "Monona" and he has a pet with a name "Lucky" */
    // Find Jeff Black in the table by searching
    await page.getByRole('textbox').fill("black")
    await page.getByText('Find Owner').click()

    const row = page.getByRole('row').locator('td')
    await expect(row.first()).toHaveText('Jeff Black')

    // Validate that Jeff is from Monona
    await expect(row.nth(2)).toHaveText('Monona')

    // Validate that Jeff has a pet named Lucky
    await expect(row.nth(4)).toContainText('Lucky')

});

test('Validate owners count of the Madison city', async ({ page }) => {
    /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    // Navigate to the owners table
    await page.getByText('Owners').click()
    await page.getByText('Search').click()

    /* 2. In the list of Owners, locate all owners who live in the city of "Madison". 
    Add the assertion that the total number of owners should be 4 */
    // Wait for all table contents to load
    await page.waitForTimeout(timeout)
    const allRows = await page.getByRole('row').all()
    let counter = 0

    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            if (await rowData.nth(2).textContent() === 'Madison') {
                // Count the occurrence of the city of Madison
                counter += 1
            }
        }
    }
    // Validate that there are only 4 'Madison' entries in the table
    expect(counter).toEqual(4)
});

test('Validate search by Last Name', async ({ page }) => {
    /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    // Navigate to the owners table
    await page.getByText('Owners').click()
    await page.getByText('Search').click()

    /* 2. On the Owners page, in the "Last name" input field, type the last name "Black" and click the  "Find Owner" button */
    const searchField = page.getByRole('textbox')
    const searchButton = page.getByText('Find Owner')

    // Search for Jeff Black
    await searchField.fill("Black")
    await searchButton.click()

    await page.waitForTimeout(timeout)

    /* 3. Add the assertion that the displayed owner in the table has a last name "Black" */
    // Validate that we found Jeff Black
    const rowData = page.getByRole('row').locator('td')
    await expect(rowData.first()).toHaveText('Jeff Black')

    /* 4. In the "Last name" input field, type the last name "Davis" and click the "Find Owner" button */
    // Search for the last name "davis"
    await searchField.fill("Davis")
    await searchButton.click()
    await page.waitForTimeout(timeout)

    /* 5. Add the assertion that each owner displayed in the table has a last name "Davis" */
    // Validate that each owner has the name "davis"
    await page.waitForTimeout(timeout)
    const allRows = await page.getByRole('row').all()
    let counter = 0

    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            // Skip the table header
            if(await rowData.nth(0).textContent() !== 'Name'){
                // Validate that each name contains "Davis"
                await expect (rowData.nth(0)).toContainText('Davis')
            }
        }
    }
    /* 6. In the "Last name" input field, type the partial match for the last name "Es" and click the "Find Owner" button */
    // Validate a search for a partial last name
    await searchField.fill("Es")
    await searchButton.click()
    await page.waitForTimeout(timeout)

    /* 7. Add the assertion that each owner displayed in the table has a last name containing "Es" */
    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            // Skip the table header
            if(await rowData.nth(0).textContent() !== 'Name'){
                // Validate that each name contains "Es"
                await expect( rowData.nth(0)).toContainText('Es')
            }
        }
    }
    /* 8. In the "Last name" input field, type the last name "Playwright" click the "Find Owner" button */
    // Validate a search for an entry with no results
    await searchField.fill("Playwright")
    await searchButton.click()
    await page.waitForTimeout(timeout)

    /* 9. Add the assertion of the message "No owners with LastName starting with "Playwright"" */
    // Validate that the error message is correct
    await expect(page.locator('h2').locator('..').locator('div').nth(-1)).toHaveText("No owners with LastName starting with \"Playwright\"")
});

test('Validate phone number and pet name on the Owner Information page', async ({ page }) => {
    /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    // Navigate to the owners table
    await page.getByText('Owners').click()
    await page.getByText('Search').click()
    // Wait for all table contents to load
    await page.waitForTimeout(timeout)

    /* 2. Locate the owner by the phone number "6085552765". Extract the Pet name displayed in the table for the owner and save it to the variable. Click on this owner. */
    const phoneNumber = '6085552765'
    const allRows = await page.getByRole('row').all()
    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            // Locate the desired phone number...
            if (await rowData.nth(3).textContent() === phoneNumber) {
                // Capture the pet name...
                const petName = await rowData.last().textContent()
                
                // ...and click on the owner's name. There is only one link in the row, and that is the owner's name.
                await rowData.getByRole('link').click()

                // Wait for all the tables to load
                await page.waitForTimeout(timeout)

                /* 3. On the Owner Information page, add the assertion that "Telephone" value in the Onner Information card is "6085552765" */
                // Validate that the phone number is listed correctly
                await expect(page.getByRole('cell', {name: 'Telephone'}).locator('..').getByRole('cell').last()).toHaveText(phoneNumber)

                /* 4. Add the assertion that Pet Name in the Owner Information card matches the name extracted from the page on the step 2 */
                // Find table row "name" to validate the correct pet name appears
                // Assumes there is only one pet in the Owner Information page
                await expect(page.locator('dt', {hasText: 'Name'}).locator('..').locator('dd').first()).toHaveText(petName)
            }
        }
    }
});

test('Validate pets of the Madison city', async ({ page }) => {
    // Navigate to the owners table
    await page.getByText('Owners').click()
    await page.getByText('Search').click()
    // Wait for all table contents to load
    await page.waitForTimeout(timeout)

    const expectedPetsList = ['Freddy', 'George', 'Leo', 'Mulligan']
    let actualPetsList: string[] = []
    
    // Collect all rows in the table
    const allRows = await page.getByRole('row').all()

    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            if (await rowData.nth(2).textContent() === 'Madison') {
                // Locate the pet name in the row
                // Trim the result so there are no extra white spaces around the pet name
                actualPetsList.push((await rowData.nth(4).textContent())?.trim())
            }
        }
    }

    // Sort the pet names list in alphabetical order to (potentially) match the expected value
    actualPetsList.sort()

    // Compare both arrays for equality by first converting to a string and then running a comparison
    expect(actualPetsList.toString()).toEqual(expectedPetsList.toString())

});


test('Validate specialty update', async ({ page }) => {

    /* 1. Select the VETERINARIANS menu item in the navigation bar, then select "All" */ 
    // Navigate to the 'Veterinarians' page through the dropdown menu at the top
    await page.getByText("Veterinarians").click()
    await page.getByText("All").click()
    // Wait for all table contents to load
    await page.waitForTimeout(timeout)
    /* 2. On the Veterinarians page, add the assertion that "Rafael Ortega" has specialty "surgery" */ 
    // Collect all rows in the table
    const allRows = await page.getByRole('row').all()

    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            // Find Raphael Ortega specifically
            if (await rowData.first().textContent() === 'Raphael Ortega') {
                // Validate that Raphael's specialty is 'surgery'
                await expect(rowData.nth(1)).toHaveText('surgery')
            }
        }
    }

    /* 3. Select the SPECIALTIES menu item in the navigation bar */ 
    // Navigate to the Specialties page
    await page.getByRole('link', {name: 'Specialties'}).click()
    // Wait for all table contents to load
    await page.waitForTimeout(timeout)

    /* 4. Add assertion of the "Specialties" header displayed above the table */ 
    // Validate the header of the page is 'Specialties'
    await expect(page.locator('h2')).toHaveText('Specialties')

    /* 5. Click on "Edit" button for the "surgery" specialty */ 
    // Collect all rows in the table
    const allSpecialtyRows = await page.getByRole('row').all()

    // Iterate through the table rows to update 'surgery' to 'dermatology'
    for(const row of allSpecialtyRows){

        // Collect each cell in the row
        const rowData = await row.getByRole('textbox').all()

        // Skipping the header
        if(rowData.length > 0){

            // Locate the row containing 'Surgery' in the first cell of the row
            if(await rowData[0].inputValue() === 'surgery'){

                // Find the Edit button and click it to edit the record
                await row.getByText('Edit').click()

                /* 6. Add assertion "Edit Specialty" page is displayed */
                await expect(page.locator('h2')).toHaveText('Edit Specialty')

                /* 7. Update the specialty from "surgery" to "dermatology" and click "Update button" */
                // Update 'surgery' specialty to 'dermatology'
                await page.waitForTimeout(timeout)
                await page.getByRole('textbox').clear()
                await page.getByRole('textbox').fill('dermatology')
                await page.getByText('Update').click()

                /* 8. Add assertion that "surgery" was changed to "dermatology" in the list of specialties */
                // Validate that the specialty was updated, examining the first cell of the row
                await expect(rowData[0]).toHaveValue('dermatology')
            
                // Exit loop
                break;
            }
        }
    }

    /* 9. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    // Navigate to the 'Veterinarians' page through the dropdown menu at the top
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click()

    /* 10. On the Veterinarians page, add assertion that "Rafael Ortega" has specialty "dermatology" */
    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){

            // Find Raphael Ortega specifically
            if (await rowData.nth(0).textContent() === 'Raphael Ortega') {

                // Validate that Raphael's specialty is 'surgery'
                await expect(rowData.nth(1)).toHaveText('dermatology')
            }
        }
    }

    /* 11. Navigate to SPECIALTIES page, revert the changes renaming "dermatology" back to "surgery" */

    // Navigate to the Specialties page
    await page.getByRole('link', {name: 'Specialties'}).click()
    
    // Wait for all table contents to load
    await page.waitForTimeout(timeout)

    // Iterate through the table rows to update 'surgery' to 'dermatology'
    for(const row of allSpecialtyRows){

        // Collect each cell in the row
        const rowData = await row.getByRole('textbox').all()

        // Skipping the header
        if(rowData.length > 0){

            // Locate the row containing 'dermatology', which would be in the first cell
            if(await rowData[0].inputValue() === 'dermatology'){
            
                // Find the Edit button and click it to edit the record
                await row.getByText('Edit').click()
                await page.waitForTimeout(timeout)

                // Update 'dermatology' specialty back to 'surgery'
                await page.getByRole('textbox').clear()
                await page.getByRole('textbox').fill('surgery')
                await page.getByText('Update').click()

                // Exit loop
                break;
            }
        }
    }
});


test('Validate specialty lists', async ({ page }) => {
   
    /* 1. Select the SPECIALTIES menu item in the navigation bar */ 
    // Navigate to the Specialties page
    await page.getByRole('link', {name: 'Specialties'}).click()

    // Wait for all table contents to load
    await page.waitForTimeout(timeout)

    /* 2. On the Specialties page, select "Add" button. Type the new specialty "oncology" and click "Save" button */
    // Click on 'Add' button to enter a new specialty, oncology
    await page.getByRole('button', {name: 'Add'}).click()
    await page.locator('#name').fill('oncology')
    await page.getByText('Save').click()

    await page.waitForTimeout(timeout)

    /* 3. Extract all values of specialties and put them into the array. */
    // Collect all specialties and store for later usage
    const allSpecialtyRows = await page.getByRole('row').all()
    let allSpecialties: string[] = []

    // Iterate through each table row to store specialties
    for(const row of allSpecialtyRows){
        const rowData = await row.getByRole('textbox').all()

        // Skip the header
        if(rowData.length > 0){
            // Add first cell of row data (the specialty name) to the array
            allSpecialties.push(await rowData[0].inputValue())
        }
    }

    /* 4. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    // Navigate to the 'Veterinarians' page through the dropdown menu at the top
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click()

    // Wait for the Vets page to load
    await page.waitForTimeout(timeout)
    
    /* 5. On the Veterinarians page, locate the "Sharon Jenkins" in the list and click "Edit" button */
    // Select Sharon Jenkins to update her specialties
    // Collect all rows in the table
    const allRows = await page.getByRole('row').all()

    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            // Find Sharon Jenkins specifically
            if ((await rowData.nth(0).textContent())?.trim() === 'Sharon Jenkins') {

                // Click 'Edit'
                await rowData.nth(2).getByRole('button', {name: 'Edit Vet'}).click()

                // Exit loop
                break;
            }
        }
    }
    
    /* 6. Click on the Specialties drop-down menu. Extract all values from the drop-down menu to an array */
    // Select some specialties
    await page.locator('div.dropdown-display').click()

    /* 7. Add the assertion that array of specialties collected in the step 3 is equal the the array from drop-down menu */
    // Validate that the displayed list of specialties is the same as the one on the specialties page
    expect( (await page.getByRole('checkbox').locator('..').locator('label').allTextContents()).sort() ).toEqual(allSpecialties.sort())

    /* 8. Select the "oncology" specialty and click "Save vet" button */
    // Select oncology
    await page.getByRole('checkbox', {name: 'oncology'}).check()

    // Close the dropdown
    await page.locator('div.dropdown-display').click()

    // Save vet record
    await page.getByRole('button', {name: 'Save Vet'}).click()

    /* 9. On the Veterinarians page, add assertion, that "Sharon Jenkins" has specialty "oncology" */
    
    // Wait for Veterinarian table to load again
    await page.waitForTimeout(timeout)

    // Validate that Sharon has the specialty 'oncology'
    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            // Find Sharon Jenkins specifically
            if ((await rowData.nth(0).textContent())?.trim() === 'Sharon Jenkins') {
                // Validate that Sharon has the specialty 'oncology'
                await expect(rowData.nth(1)).toHaveText('oncology')
                // Exit loop
                break;
            }
        }
    }

    /* 10. Navigate to SPECIALTIES page. Click "Delete" for "oncology" specialty */
    // Navigate to the Specialties page
    await page.getByRole('link', {name: 'Specialties'}).click()
    // Wait for all table contents to load
    await page.waitForTimeout(timeout)

    // Find all Specialties
    for(const row of allSpecialtyRows){
        
        // Get all data in row
        const rowData = await row.getByRole('textbox').all()
        
        // Skip table header
        if((rowData).length > 0){

            // Search for 'oncology'
            if(await rowData[0].inputValue() === 'oncology'){

                // Delete 'oncology'
                await row.getByRole('button', {name: 'Delete'}).click()
            }
        }
    }

    /* 11. Navigate to VETERINARIANS page. Add assertion that "Sharon Jenkins" has no specialty assigned */

    // Navigate to the 'Veterinarians' page through the dropdown menu at the top
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click()

    // Wait for the Vets page to load
    await page.waitForTimeout(timeout)

    // Validate that Sharon has no specialty
    // Iterate through each row of the table
    for (const row of allRows) {
        // Collect each cell in the row
        const rowData = row.getByRole('cell')

        // Make sure the row has cells
        if((await rowData.all()).length > 0){
            // Find Sharon Jenkins specifically
            if ((await rowData.nth(0).textContent())?.trim() === 'Sharon Jenkins') {
                // Validate that Sharon has the specialty 'oncology'
                await expect(rowData.nth(1)).toBeEmpty()
                // Exit loop
                break;
            }
        }
    }

});