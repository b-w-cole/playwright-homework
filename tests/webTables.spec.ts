import { test, expect } from '@playwright/test';
import { spec } from 'node:test/reporters';

test.beforeEach(async ({ page }) => {
    await page.goto('/')

})

test.describe('Validate Owner Information', () => {
    
    test.beforeEach(async ({ page }) => {
        /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
        // Navigate to the owners table for the following tests
        await page.getByText('Owners').click()
        await page.getByText('Search').click()
    })

    test('Validate the pet name city of the owner', async ({ page }) => {
        /* 2. In the list of Owners, locate the owner by the name "Jeff Black". 
        Add the assertions that this owner is from the city of "Monona" and he has a pet with a name "Lucky" */
        // Find Jeff Black in the table 
        const row = page.getByRole('row', {name: 'Jeff Black'})
    
        // Validate the owner is from Monona
        await expect(row.locator('td').nth(2)).toHaveText('Monona')
    
        // Validate the owner has a pet named Lucky
        await expect(row.locator('td').nth(4)).toHaveText('Lucky')
    
    })
    
    test('Validate owners count of the Madison city', async ({ page }) => {
        /* 2. In the list of Owners, locate all owners who live in the city of "Madison". 
        Add the assertion that the total number of owners should be 4 */
        
        // Validate there are only 4 entries of 'Madison' in the city column
        await expect(page.getByRole('row', {name: 'Madison'})).toHaveCount(4)
    
    })
    
    test('Validate search by Last Name', async ({ page }) => {
        /* 2. - 8. In the "Last name" input field, type the last name "Black", "Davis", "Es" (partial string), and "Playwright". */
        const lastNames = ['Black', 'Davis', 'Es', 'Playwright']
    
        for(const lastName of lastNames){
            await page.getByRole('textbox').fill(lastName)
            await page.getByText('Find Owner').click()
            
            await page.waitForResponse("https://petclinic-api.bondaracademy.com/petclinic/api/owners?lastName*")

            // Capture the rows in the table body pertaining to the owner
            const rows = await page.locator('.ownerFullName').all()

            for(const row of rows){

                // Checking if the name isn't our negative test, 'Playwright'.
                if(lastName !== 'Playwright'){
                    await expect(row).toContainText(lastName) 
                }
                else{
                    /* 9. Add the assertion of the message "No owners with LastName starting with "Playwright"" */
                    // If we get an unknown name, the message below should be displayed
                    await expect(page.locator('div.container.xd-container div').last()).toHaveText('No owners with LastName starting with \"Playwright\"')
                }
            }
        }
    })
    
    test('Validate phone number and pet name on the Owner Information page', async ({ page }) => {
        /* 2. Locate the owner by the phone number "6085552765". Extract the Pet name displayed in the table for the owner and save it to the variable. Click on this owner. */
        const phoneNumber = '6085552765'
        const row = page.getByRole('row', {name: phoneNumber})
        const petName = await row.locator('td').nth(4).textContent()
    
        // Click on the owner to go to the owner information page
        await row.getByRole('link').click()
    
        /* 3. On the Owner Information page, add the assertion that "Telephone" value in the Onner Information card is "6085552765" */
        // Validate that the phone number is listed correctly
        await expect(page.getByRole('row', {name: 'Telephone'}).getByRole('cell').last()).toHaveText(phoneNumber)
    
        /* 4. Add the assertion that Pet Name in the Owner Information card matches the name extracted from the page on the step 2 */
        // Validate the correct pet name by finding 'name' in the first pet information table
        await expect(page.locator('div.container.xd-container').locator('dd').first()).toContainText(petName!)
    })
    
    test('Validate pets of the Madison city', async ({ page }) => {
        // Wait for the table and its data to load
        await page.waitForSelector('table')
    
        // Create a list of the expected Madison pets
        const expectedPetsList = ['Freddy', 'George', 'Leo', 'Mulligan']
    
        // Collect rows in the table referring to the city of Madison (mitigating the potential for an owner named Madison)
        const madisonRows = await page.getByRole('row', {name: 'Madison'}).all()
        
        /* 2. On the Owners page, perform the assertion that Madison city has a list of pets: Leo, George, Mulligan, Freddy */
        // Create an empty list for what we actually find
        let actualPetsList: string[] = []
    
        // Iterate through the rows to extract the pet names
        for(const row of madisonRows){
            // Ensure we're not dealing with an empty row
            if((await row.getByRole('cell').all()).length > 0){
    
                // Add the pet name to the comparing list of names, with each name trimmed of excess white space
                actualPetsList.push( (await row.getByRole('cell').nth(4).textContent())?.trim() )
            }
        }
    
        // Comparing both sorted lists for equality
        expect (actualPetsList.sort()).toEqual(expectedPetsList.sort())
    
    })
})


test('Validate specialty update', async ({ page }) => {

    /* 1. Select the VETERINARIANS menu item in the navigation bar, then select "All" */ 
    // Navigate to the 'Veterinarians' page through the dropdown menu at the top
    await page.getByText("Veterinarians").click()
    await page.getByText("All").click()
    
    // Wait for all table contents to load
    await page.waitForSelector('table')

    /* 2. On the Veterinarians page, add the assertion that "Rafael Ortega" has specialty "surgery" */ 
    // Validate Raphael's veterinarian specialty
    await expect(page.getByRole('row', {name: 'Rafael Ortega'}).getByRole('cell').nth(1)).toHaveText('surgery')

    /* 3. Select the SPECIALTIES menu item in the navigation bar */ 
    // Navigate to the Specialties page
    await page.getByRole('link', {name: 'Specialties'}).click()

    /* 4. Add assertion of the "Specialties" header displayed above the table */ 
    // Validate the header of the page is 'Specialties'
    await expect(page.locator('h2')).toHaveText('Specialties')

    /* 5. Click on "Edit" button for the "surgery" specialty */ 
    // Wait for all table contents to load
    await page.waitForSelector('tbody')

    // Edit the 'surgery' specialty via table body rows
    const allRows = await page.locator('tbody tr').all()

    // Iterate through rows to find 'surgery'
    for (let row of allRows) {
        // If 'surgery' is found...
        if( await row.locator('input').inputValue() === 'surgery'){
            // ... click 'Edit'
            await row.getByRole('button', { name: 'Edit' }).click()
            break;
        }
    }

    /* 6. Add assertion "Edit Specialty" page is displayed */
    await expect(page.locator('h2')).toHaveText('Edit Specialty')

    /* 7. Update the specialty from "surgery" to "dermatology" and click "Update button" */
    // Await 'surgery' to load in the input...
    const specialtyInput = page.locator('#name')
    await expect(specialtyInput).toHaveValue('surgery')

    // Update the 
    await specialtyInput.clear()
    await specialtyInput.fill('dermatology')
    await page.getByText('Update').click()
    
    /* 8. Add assertion that "surgery" was changed to "dermatology" in the list of specialties */

    /* 9. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
     // Navigate to the 'Veterinarians' page through the dropdown menu at the top
     
    await page.getByText("Veterinarians").click()
    await page.getByText("All").click()

    /* 10. On the Veterinarians page, add assertion that "Rafael Ortega" has specialty "dermatology" */
    // Validate Raphael's veterinarian specialty
    await expect(page.getByRole('row', {name: 'Rafael Ortega'}).getByRole('cell').nth(1)).toHaveText('dermatology')

    /* 11. Navigate to SPECIALTIES page, revert the changes renaming "dermatology" back to "surgery" */
    // Navigate to the Specialties page
    await page.getByRole('link', {name: 'Specialties'}).click()

   // Iterate through rows to find 'dermatology'
   for (let row of allRows) {
        // If 'surgery' is found...
        if( await row.locator('input').inputValue() === 'dermatology'){
            // ... click 'Edit'
            await row.getByRole('button', { name: 'Edit' }).click()
            break;
        }
    }

    // Await 'surgery' to load in the input...
    await expect(specialtyInput).toHaveValue('dermatology')

    // Revert dermatology back to surgery
    await specialtyInput.clear()
    await specialtyInput.fill('surgery')
    await page.getByText('Update').click()

})


test('Validate specialty lists', async ({ page }) => {
   
    /* 1. Select the SPECIALTIES menu item in the navigation bar */ 
    // Navigate to the Specialties page
    await page.getByRole('link', {name: 'Specialties'}).click()

    await page.waitForSelector('tbody')
    /* 2. On the Specialties page, select "Add" button. Type the new specialty "oncology" and click "Save" button */
    // Click on 'Add' button to enter a new specialty, oncology
    await page.getByRole('button', {name: 'Add'}).click()
    await page.locator('#name').fill('oncology')
    await page.getByText('Save').click()
    
    // Validate 'oncology' was added
    await expect(page.locator('tbody tr').last().getByRole('textbox')).toHaveValue('oncology')

     /* 3. Extract all values of specialties and put them into the array. */
    // Collect all specialties and store for later usage
    const allSpecialtyInputs = await page.locator('tbody tr').getByRole('textbox').all()
    const allSpecialties : string [] = []

    // Iterate through all the rows to collect the Specialty and store in allSpecialties for future validation
    for(const input of allSpecialtyInputs){
        allSpecialties.push(await input.inputValue())
    }

    /* 4. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    // Navigate to the 'Veterinarians' page through the dropdown menu at the top
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click()
    
    /* 5. On the Veterinarians page, locate the "Sharon Jenkins" in the list and click "Edit" button */
    // Locate Sharon Jenkins and click 'Edit'
    await page.getByRole('row', {name: 'Sharon Jenkins'}).getByRole('cell').last().getByRole('button', {name: 'Edit Vet'}).click()
    
    /* 6. Click on the Specialties drop-down menu. Extract all values from the drop-down menu to an array */
    // Click the dropdown for specialties
    await page.locator('div.dropdown-display').click()

    /* 7. Add the assertion that array of specialties collected in the step 3 is equal the the array from drop-down menu */
    // Validate that the displayed list of specialties is the same as the one on the specialties page
    expect(await page.locator('div.dropdown-content').locator('label').allTextContents()).toEqual(allSpecialties)

    /* 8. Select the "oncology" specialty and click "Save vet" button */
    // Select oncology
    await page.getByRole('checkbox', {name: 'oncology'}).check()

    // Close the dropdown
    await page.locator('div.dropdown-display').click()

    // Save vet record
    await page.getByRole('button', {name: 'Save Vet'}).click()

    /* 9. On the Veterinarians page, add assertion, that "Sharon Jenkins" has specialty "oncology" */
    // Wait for Veterinarian table to load again
    await page.waitForSelector('table')

    // Validate that 'Sharon Jenkins' has the specialty 'oncology'
    await expect(page.getByRole('row', {name: 'Sharon Jenkins'}).getByRole('cell').nth(1)).toHaveText('oncology')

    /* 10. Navigate to SPECIALTIES page. Click "Delete" for "oncology" specialty */
    // Navigate to the Specialties page
    await page.getByRole('link', {name: 'Specialties'}).click()
    
    // Wait for Specialties table to load 
    await page.waitForSelector('tbody')

    // Delete the 'oncology' specialty via table body rows
    const allRows = await page.locator('tbody tr').all()

    // Iterate through rows to find 'oncology'
    for (let row of allRows) {
        // If 'oncology' is found...
        if( await row.locator('input').inputValue() === 'oncology'){
            // 'Delete' it
            await row.getByRole('button', { name: 'Delete' }).click()
            break;
        }
    }

    /* 11. Navigate to VETERINARIANS page. Add assertion that "Sharon Jenkins" has no specialty assigned */
    // Navigate to the 'Veterinarians' page through the dropdown menu at the top
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click()

    // Validate that 'Sharon Jenkins' has no specialty
    await expect(page.getByRole('row', {name: 'Sharon Jenkins'}).getByRole('cell').nth(1)).toBeEmpty()

})