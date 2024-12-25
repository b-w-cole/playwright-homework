import { test } from './test-options'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('test with fixture', async ({ pageManager, newOwnerFixture }) => {

    const ownerFullName = `${newOwnerFixture[0].firstName} ${newOwnerFixture[0].lastName}`
    const address = newOwnerFixture[0].address
    const city = newOwnerFixture[0].city
    const telephone = newOwnerFixture[0].telephone
    const petName = newOwnerFixture[0].petName
    const petBirthdate = newOwnerFixture[0].petBirthdate
    const petType = newOwnerFixture[0].petType
    const visitDate = newOwnerFixture[0].visitDate
    const visitDescription = newOwnerFixture[0].visitDescription
    
    // Validate Information
    await pageManager.onOwnerInformationPage().validateOwnerInformation(ownerFullName, address, city, telephone)
    await pageManager.onOwnerInformationPage().validatePetInformation(petName, petBirthdate, petType)
    await pageManager.onOwnerInformationPage().validateTopVisitInformationFor(petName, visitDate, visitDescription)
    await pageManager.onOwnerInformationPage().validateVisitDateDisplayForTopVisit(petName, visitDate)

    // Delete visit and pet data
    await pageManager.onOwnerInformationPage().deleteVisit(petName, visitDate)
    await pageManager.onOwnerInformationPage().deletePet(petName)

    // Assertions to validate data deletion
    await pageManager.onOwnerInformationPage().validatePetDoesntExist(petName)
    await pageManager.onOwnerInformationPage().validateVisitDoesntExist(visitDate, visitDescription)

})