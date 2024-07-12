import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
    await page.goto('/')
  
    /* 1. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    // Navigate to the 'Veterinarians' page through the dropdown menu on the home page
    await page.getByText("Veterinarians").click();
    await page.getByText("All").click()

  });

test('Validate selected specialties', async ({page}) => {
    /* 2. Add assertion of the "Veterinarians" text displayed above the table with the list of Veterinarians */
    // Validate that the page header says 'Vetrinarians'
    await expect(page.locator('h2')).toHaveText('Veterinarians')

    /* 3. Select the first veterinarian "Helen Leary" and click "Edit Vet" button */
    // Click edit vet to edit the 2nd entry
    //await page.locator('button', {hasText: 'Edit Vet'}).nth(1).click()
    await page.getByText('Edit Vet').nth(1).click()

    /* 4. Add assertion of the "Specialties" field. The value "radiology" is displayed */
    const specialtiesDropdown = page.locator('div.dropdown')
    const specialtiesDropdownText = specialtiesDropdown.locator('.selected-specialties')

    // Validate that the dropdown text says 'radiology'
    await expect(specialtiesDropdownText).toHaveText('radiology')

    /* 5. Click on the "Specialties" drop-down menu */
    // Click the dropdown to select more options
    await specialtiesDropdown.click()

    /* 6. Add assertion that "radiology" specialty is checked */
    const radiologyOption = page.locator('#radiology')
    const surgeryOption = page.locator('#surgery')
    const dentistryOption = page.locator('#dentistry')

    // Validate that the 'radiology' option is checked, as displayed in the dropdown
    await expect(radiologyOption).toBeChecked()

    /* 7. Add assertion that "surgery" and "dentistry" specialties are unchecked */
    // Validate that both the surgery and dentistry options are unchecked, as displayed in the dropdown
    await expect(surgeryOption).not.toBeChecked()
    await expect(dentistryOption).not.toBeChecked()

    /* 8. Check the "surgery" item specialty and uncheck the "radiology" item speciality  */
    // Select 'surgery' and unselecting 'radiology'
    await surgeryOption.check()
    await radiologyOption.uncheck()

    /* 9. Add assertion of the "Specialties" field displayed value "surgery" */
    // Validate that only 'surgery' is checked
    await expect(specialtiesDropdownText).toHaveText('surgery')

    /* 10. Check the "dentistry" item specialty */
    // Select the 'dentistry' specialty
    await dentistryOption.check()

    /* 11. Add assertion of the "Specialties" field. The value "surgery, dentistry" is displayed */
    // Validate that the dropdown displays both 'surgery' and 'dentistry' specialties
    await expect(specialtiesDropdownText).toHaveText('surgery, dentistry')

});

test('Select all specialties', async ({page}) => {

    /* 2. Select the fourth veterinarian "Rafael Ortega" and click "Edit Vet" button */
    // Edit the fourth veterinarian in the list
    await page.getByText('Edit Vet').nth(3).click()

    /* 3. Add assertion that "Specialties" field is displayed value "surgery" */
    const specialtiesDropdown = page.locator('div.dropdown')
    const specialtiesDropdownText = specialtiesDropdown.locator('.selected-specialties')

    // Validate that the specialties listed is only 'surgery'
    await expect(specialtiesDropdownText).toHaveText('surgery')

    /* 4. Click on the "Specialties" drop-down menu */
    // Click on the specialties dropdown to show options
    await specialtiesDropdown.click()

    /* 5. Check all specialties from the list */
    /* 6. Add assertion that all specialties are checked */

    // Capture all specialties from checkbox
    const specialties = page.locator('.dropdown-content label')
    
    for(const specialty of await specialties.allTextContents()){
        const checkbox = page.getByRole('checkbox', {name: specialty})
        
        // Check every box
        await checkbox.check()

        // Validate that the box is checked
        await expect(checkbox).toBeChecked()
    }

    /* 7. Add assertion that all checked specialities are displayed in the "Specialties" field */
    // Validate that all specialties are displayed accordingly
    await expect(specialtiesDropdownText).toHaveText('surgery, radiology, dentistry, nail trims')
});

test('Unselect all specialties', async ({page}) => {
    /* 2. Select the third veterinarian "Linda Douglas" and click "Edit Vet" button */
    // Edit the third veterinarian in the list
    await page.locator('button', {hasText: 'Edit Vet'}).nth(2).click()

    /* 3. Add assertion of the "Specialties" field displayed value "surgery, dentistry" */
    const specialtiesDropdown = page.locator('div.dropdown')
    const specialtiesDropdownText = specialtiesDropdown.locator('div span.selected-specialties')

    // Validate that the dropdown displays both 'dentistry' and 'surgery' selections
    await expect(specialtiesDropdownText).toHaveText('dentistry, surgery')
    
    /* 4. Click on the "Specialties" drop-down menu */
    await specialtiesDropdown.click()

    /* 5. Uncheck all specialties from the list */
    /* 6. Add assertion that all specialties are unchecked */

    // Capture all specialties from checkbox
    const specialties = page.locator('.dropdown-content label')
    
    for(const specialty of await specialties.allTextContents()){
        const checkbox = page.getByRole('checkbox', {name: specialty})

        // Check every box
        await checkbox.uncheck()
        
        // Validate that the box is unchecked
        await expect(checkbox).not.toBeChecked()
    }

    /* 7. Add assertion that "Specialties" field is empty */
    // Validate that there are no specialties listed and the dropdown is empty
    await expect(specialtiesDropdownText).toHaveText('')
});