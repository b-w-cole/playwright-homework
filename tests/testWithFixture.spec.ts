import { test } from './test-options'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('test with fixture', async ({ pageManager, newOwnerFixture }) => {

    const ownerFullName = `${newOwnerFixture.firstName} ${newOwnerFixture.lastName}`
    const address = newOwnerFixture.address
    const city = newOwnerFixture.city
    const telephone = newOwnerFixture.telephone
    const petName = newOwnerFixture.petName
    const petBirthdate = newOwnerFixture.petBirthdate
    const petType = newOwnerFixture.petType
    const visitDate = newOwnerFixture.visitDate
    const visitDescription = newOwnerFixture.visitDescription
    
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
    await pageManager.onOwnerInformationPage().validateVisitDoesntExist(petName, visitDate, visitDescription)

})