import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    
})

test('Select the desired date in the calendar - 1', async ({page}) => {
    const pm = new PageManager(page)
    /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    await pm.navigateTo().ownersPage()

    /* 2. In the list of the Owners, locate the owner by the name "Harold Davis" and select this owner */
    await pm.onOwnersPage().selectOwner('Harold Davis')

    /* 3. On the Owner Information page, select "Add New Pet" button */
    /* 4. In the Name field, type any new pet name, for example "Tom" */
    /* 5. Add the assertion of icon in the input field, that it changed from "X" to "<checkmark>" */
    /* 6. Click on the calendar icon for the "Birth Date" field */
    /* 7. Using calendar selector, select the date "May 2nd, 2014" */
    /* 8. Add the assertion of the in the input field is in the format "2014/05/02" */
    /* 9. Select the type of pet "dog" and click "Save Pet" button */
    /* 10. On the Owner Information page, add assertions for the newly created pet. Name is Tom, Birth Date is in the format "2014-05-02", Type is dog */
    const petName = 'Tom'
    const petBirthDate = new Date('5/2/2014')
    const petType = 'dog'

    await pm.onOwnerInformationPage().clickAddPet()
    await pm.onPetDetailsPage().fillPetDetailsAndUpdate(petName, petBirthDate, petType)

    /* 11. Click "Delete Pet" button the for the new pet "Tom" */
    /* 12. Add assertion that Tom does not exist in the list of pets anymore */
    // Clean up from test
    await pm.onOwnerInformationPage().deletePet('Tom')

})

test('Select the desired date in the calendar - 2', async ({page}) => {
    const pm = new PageManager(page)
    
    /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    await pm.navigateTo().ownersPage()

    /* 2. In the list of the Owners, locate the owner by the name "Jean Coleman" and select this owner */
    await pm.onOwnersPage().selectOwner('Jean Coleman')

    /* 3. In the list of pets, locate the pet with a name "Samantha" and click "Add Visit" button */
    await pm.onOwnerInformationPage().clickAddVisit('Samantha')

    /* 4. Add the assertion that "New Visit" is displayed as header of the page */
    // Validate that "New Visit" is displayed as header of the page 
    await pm.onVisitsPage().validatePageHeader('New Visit')

    /* 5. Add the assertion that pet name is "Samantha" and owner name is "Jean Coleman" */
    // Assert that the pet name and owner are correct
    await pm.onVisitsPage().validatePetAndOwnerInfoAreDisplayedCorrectly('Samantha', 'Jean Coleman')

    /* 6. Click on the calendar icon and select the current date in date picker */
    /* 7. Add assertion that date is displayed in the format "YYYY/MM/DD" */
    /* 8. Type the description in the field, for example, "dermatologists visit" and click "Add Visit" button */
    const appointmentDate = new Date()
    await pm.onVisitsPage().addVisit(appointmentDate, 'dermatologists visit')

    /* 9. Add assertion that date of visit is displayed at the top of the list of visits for "Samantha" pet on the "Owner Information" page and is in the format "YYYY-MM-DD" */    
    await pm.onOwnerInformationPage().validateVisitDateDisplayForTopVisit('Samantha', appointmentDate)

    
    /* 10. Add one more visit for "Samantha" pet by clicking "Add Visit" button */
    await pm.onOwnerInformationPage().clickAddVisit('Samantha')
    

    /* 11. Click on the calendar icon and select the date which is 45 days back from the current date */
    const newAppointmentDate: Date = new Date()
    newAppointmentDate.setDate(newAppointmentDate.getDate() - 45)

    /* 12. Type the description in the field, for example, "massage therapy" and click "Add Visit" button */
    await pm.onVisitsPage().addVisit(newAppointmentDate, 'massage therapy')

    /* 13. Add the assertion, that date added at step 11 is in chronological order in relation to the previous dates for "Samantha" pet on the "Owner Information" page. The date of visit above this date in the table should be greater. */
    await pm.onOwnerInformationPage().compareOrderOfTopTwoVisitsByDate('Samantha')

    /* 14. Select the "Delete Visit" button for both newly created visits */
    /* 15. Add the assertion that deleted visits are no longer displayed in the table on "Owner Information" page */
    await pm.onOwnerInformationPage().deleteVisit('Samantha', newAppointmentDate)
    await pm.onOwnerInformationPage().deleteVisit('Samantha', appointmentDate)

})