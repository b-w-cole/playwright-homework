import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'

test.beforeEach( async({page}) => {
    await page.goto('/')

  });

test('Validate selected specialties', async ({page}) => {
    const pm = new PageManager(page)

    /* 1. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    await pm.navigateTo().veterinariansPage()

    /* 2. Add assertion of the "Veterinarians" text displayed above the table with the list of Veterinarians */
    await pm.onVeterinariansPage().validatePageHeader('Veterinarians')

    /* 3. Select the first veterinarian "Helen Leary" and click "Edit Vet" button */
    await pm.onVeterinariansPage().editVeterinarian('Helen Leary')

    /* 4. Add assertion of the "Specialties" field. The value "radiology" is displayed */
    await pm.onVeterinarianDetailsPage().validateSpecialtyDisplayedIs('radiology')

    /* 5. Click on the "Specialties" drop-down menu -> now in veterinarianDetailPage.ts*/
    /* 6. Add assertion that "radiology" specialty is checked */
    /* 7. Add assertion that "surgery" and "dentistry" specialties are unchecked */
    await pm.onVeterinarianDetailsPage().validateOnlySpecialtyCheckedIs('radiology')

    /* 8. Check the "surgery" item specialty and uncheck the "radiology" item speciality  */
    await pm.onVeterinarianDetailsPage().selectSpecialty('surgery')
    await pm.onVeterinarianDetailsPage().deselectSpecialty('radiology')

    /* 9. Add assertion of the "Specialties" field displayed value "surgery" */
    await pm.onVeterinarianDetailsPage().validateSpecialtyDisplayedIs('surgery')

    /* 10. Check the "dentistry" item specialty */
    await pm.onVeterinarianDetailsPage().selectSpecialty('dentistry')

    /* 11. Add assertion of the "Specialties" field. The value "surgery, dentistry" is displayed */
    await pm.onVeterinarianDetailsPage().validateSpecialtyDisplayedIs('surgery, dentistry')

});

    
test('Select all specialties', async ({page}) => {
    const pm = new PageManager(page)

    /* 1. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    await pm.navigateTo().veterinariansPage()

    /* 2. Select the fourth veterinarian "Rafael Ortega" and click "Edit Vet" button */
    await pm.onVeterinariansPage().editVeterinarian('Rafael Ortega')

    /* 3. Add assertion that "Specialties" field is displayed value "surgery" */
    await pm.onVeterinarianDetailsPage().validateSpecialtyDisplayedIs('surgery')

    /* 4. Click on the "Specialties" drop-down menu */
    /* 5. Check all specialties from the list */
    /* 6. Add assertion that all specialties are checked */
    await pm.onVeterinarianDetailsPage().selectAllSpecialties()
    
    /* 7. Add assertion that all checked specialities are displayed in the "Specialties" field */
    await pm.onVeterinarianDetailsPage().validateSpecialtyDisplayedIs('surgery, radiology, dentistry, nail trims')
});


test('Unselect all specialties', async ({page}) => {
    const pm = new PageManager(page)

    /* 1. Select the VETERINARIANS menu item in the navigation bar, then select "All" */
    await pm.navigateTo().veterinariansPage()

    /* 2. Select the fourth veterinarian "Linda Douglas" and click "Edit Vet" button */
    await pm.onVeterinariansPage().editVeterinarian('Linda Douglas')

    /* 3. Add assertion that "Specialties" field is displayed value "surgery" */
    await pm.onVeterinarianDetailsPage().validateSpecialtyDisplayedIs('dentistry, surgery')
    
    /* 4. Click on the "Specialties" drop-down menu */
    /* 5. Uncheck all specialties from the list */
    /* 6. Add assertion that all specialties are unchecked */
    await pm.onVeterinarianDetailsPage().deselectAllSpecialties()

    /* 7. Add assertion that "Specialties" field is empty */
    // Validate that there are no specialties listed and the dropdown is empty
    await pm.onVeterinarianDetailsPage().validateSpecialtyDisplayedIs('')
});