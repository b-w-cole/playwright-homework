import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'

test.beforeEach( async({page}) => {
    await page.goto('/')

  });

test('Validate selected specialties', async ({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().veterinariansPage()

    await pm.onVeterinariansPage().clickEditVeterinarianFor('Helen Leary')

    /* 4. Add assertion of the "Specialties" field. The value "radiology" is displayed */
    await pm.onEditVeterinarianPage().validateSpecialtyDisplayedIs('radiology')

    /* 5. Click on the "Specialties" drop-down menu -> now in veterinarianDetailPage.ts*/
    /* 6. Add assertion that "radiology" specialty is checked */
    /* 7. Add assertion that "surgery" and "dentistry" specialties are unchecked */
    await pm.onEditVeterinarianPage().validateOnlySpecialtyCheckedIs('radiology')

    /* 8. Check the "surgery" item specialty and uncheck the "radiology" item speciality  */
    await pm.onEditVeterinarianPage().selectSpecialty('surgery')
    await pm.onEditVeterinarianPage().deselectSpecialty('radiology')

    /* 9. Add assertion of the "Specialties" field displayed value "surgery" */
    await pm.onEditVeterinarianPage().validateSpecialtyDisplayedIs('surgery')

    /* 10. Check the "dentistry" item specialty */
    await pm.onEditVeterinarianPage().selectSpecialty('dentistry')

    /* 11. Add assertion of the "Specialties" field. The value "surgery, dentistry" is displayed */
    await pm.onEditVeterinarianPage().validateSpecialtyDisplayedIs('surgery, dentistry')

});

    
test('Select all specialties', async ({page}) => {
    const pm = new PageManager(page)

    /* 1. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    await pm.navigateTo().veterinariansPage()

    /* 2. Select the fourth veterinarian "Rafael Ortega" and click "Edit Vet" button */
    await pm.onVeterinariansPage().clickEditVeterinarianFor('Rafael Ortega')

    /* 3. Add assertion that "Specialties" field is displayed value "surgery" */
    await pm.onEditVeterinarianPage().validateSpecialtyDisplayedIs('surgery')

    /* 4. Click on the "Specialties" drop-down menu */
    /* 5. Check all specialties from the list */
    /* 6. Add assertion that all specialties are checked */
    await pm.onEditVeterinarianPage().selectAllSpecialties()
    
    /* 7. Add assertion that all checked specialities are displayed in the "Specialties" field */
    await pm.onEditVeterinarianPage().validateSpecialtyDisplayedIs('surgery, radiology, dentistry, nail trims')
});


test('Unselect all specialties', async ({page}) => {
    const pm = new PageManager(page)

    /* 1. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    await pm.navigateTo().veterinariansPage()

    /* 2. Select the fourth veterinarian "Linda Douglas" and click "Edit Vet" button */
    await pm.onVeterinariansPage().clickEditVeterinarianFor('Linda Douglas')

    /* 3. Add assertion that "Specialties" field is displayed value "surgery" */
    await pm.onEditVeterinarianPage().validateSpecialtyDisplayedIs('dentistry, surgery')
    
    /* 4. Click on the "Specialties" drop-down menu */
    /* 5. Uncheck all specialties from the list */
    /* 6. Add assertion that all specialties are unchecked */
    await pm.onEditVeterinarianPage().deselectAllSpecialties()

    /* 7. Add assertion that "Specialties" field is empty */
    // Validate that there are no specialties listed and the dropdown is empty
    await pm.onEditVeterinarianPage().validateSpecialtyDisplayedIs('')
});