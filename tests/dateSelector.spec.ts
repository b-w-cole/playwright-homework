import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { RandomDataHelper } from '../pages/randomDataHelper';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    
})

test('Select the desired date in the calendar - 1', async ({page}) => {
    const pm = new PageManager(page)
    const randomDataHelper = new RandomDataHelper()

    await pm.navigateTo().ownersPage()

    await pm.onOwnersPage().clickOwnerNameFor('Harold Davis')

    const testPetName = randomDataHelper.getPetName()
    const testPetBirthDate = randomDataHelper.getPetBirthdate()
    // Pet type will be selected from pre-defined list
    const testPetType = 'dog'

    await pm.onOwnerInformationPage().clickAddPet()
    await pm.onAddPetPage().addNewPet(testPetName, testPetBirthDate, testPetType)

    /* 11. Click "Delete Pet" button the for the new pet "Tom" */
    /* 12. Add assertion that Tom does not exist in the list of pets anymore */
    // Clean up from test
    await pm.onOwnerInformationPage().deletePet(testPetName)

})

test('Select the desired date in the calendar - 2', async ({page}) => {
    const pm = new PageManager(page)
    const randomDataHelper = new RandomDataHelper()

    const testPetOwner = 'Jean Coleman'
    const testPetName = 'Samantha'
    const testVisitReason1 = randomDataHelper.getVisitDescription()
    const testVisitReason2 = randomDataHelper.getVisitDescription()
    
    /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    await pm.navigateTo().ownersPage()

    /* 2. In the list of the Owners, locate the owner by the name "Jean Coleman" and select this owner */
    await pm.onOwnersPage().clickOwnerNameFor(testPetOwner)

    /* 3. In the list of pets, locate the pet with a name "Samantha" and click "Add Visit" button */
    await pm.onOwnerInformationPage().clickAddVisit(testPetName)
    
    /* 5. Add the assertion that pet name is "Samantha" and owner name is "Jean Coleman" */
    // Assert that the pet name and owner are correct
    await pm.onNewVisitPage().validatePetAndOwnerInfoAreDisplayedCorrectly(testPetName, testPetOwner)

    /* 6. Click on the calendar icon and select the current date in date picker */
    /* 7. Add assertion that date is displayed in the format "YYYY/MM/DD" */
    /* 8. Type the description in the field, for example, "dermatologists visit" and click "Add Visit" button */
    const appointmentDate = new Date()
    await pm.onNewVisitPage().addVisit(appointmentDate, testVisitReason1)

    /* 9. Add assertion that date of visit is displayed at the top of the list of visits for "Samantha" pet on the "Owner Information" page and is in the format "YYYY-MM-DD" */    
    await pm.onOwnerInformationPage().validateVisitDateDisplayForTopVisit(testPetName, appointmentDate)

    
    /* 10. Add one more visit for "Samantha" pet by clicking "Add Visit" button */
    await pm.onOwnerInformationPage().clickAddVisit(testPetName)
    

    /* 11. Click on the calendar icon and select the date which is 45 days back from the current date */
    const newAppointmentDate: Date = new Date()
    newAppointmentDate.setDate(newAppointmentDate.getDate() - 45)

    /* 12. Type the description in the field, for example, "massage therapy" and click "Add Visit" button */
    await pm.onNewVisitPage().addVisit(newAppointmentDate, testVisitReason2)

    /* 13. Add the assertion, that date added at step 11 is in chronological order in relation to the previous dates for "Samantha" pet on the "Owner Information" page. The date of visit above this date in the table should be greater. */
    await pm.onOwnerInformationPage().validateTwoLastVisitsInDesendOrder(testPetName)

    /* 14. Select the "Delete Visit" button for both newly created visits */
    /* 15. Add the assertion that deleted visits are no longer displayed in the table on "Owner Information" page */
    await pm.onOwnerInformationPage().deleteVisit(testPetName, newAppointmentDate)
    await pm.onOwnerInformationPage().deleteVisit(testPetName, appointmentDate)

})