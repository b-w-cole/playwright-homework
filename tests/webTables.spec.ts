import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    

})

test.describe('Validate Owner Information', () => {
    
    test('Validate the pet name city of the owner', async ({ page }) => {
        const pm = new PageManager(page)
        
        await pm.navigateTo().ownersPage()

        await pm.onOwnersPage().validatePetAndCityOfOwner('Jeff Black', 'Lucky', 'Monona')

    })
    
    test('Validate owners count of the Madison city', async ({ page }) => {
        const pm = new PageManager(page)
        
        await pm.navigateTo().ownersPage()
        
        await pm.onOwnersPage().validateOwnerCountForCity('Madison', 4)
    
    })
    
    test('Validate search by Last Name', async ({ page }) => {
        const pm = new PageManager(page)

        await pm.navigateTo().ownersPage()

        const lastNamesToSearch = ['Black', 'Davis', 'Es', 'Playwright']

        for(const lastName of lastNamesToSearch){
            await pm.onOwnersPage().searchForOwnerByLastNameAndValidateOwnerExistsFor(lastName)
        }
        
    })
    
    test('Validate phone number and pet name on the Owner Information page', async ({ page }) => {
        const pm = new PageManager(page)
        
        await pm.navigateTo().ownersPage()

        const phoneNumber = '6085552765'
        const petName = await pm.onOwnersPage().getPetNameByPhoneNumber(phoneNumber)
        const ownerName = await pm.onOwnersPage().getOwnerByPhoneNumber(phoneNumber)

        await pm.onOwnersPage().clickOwnerNameFor(ownerName!) 

        await pm.onOwnerInformationPage().validatePhoneNumberAndPets(phoneNumber, petName!)
        
    })
    
    test('Validate pets of the Madison city', async ({ page }) => {

        const pm = new PageManager(page)
        const expectedPetsList = ['Freddy', 'George', 'Leo', 'Mulligan']

        await pm.navigateTo().ownersPage()
        
        await pm.onOwnersPage().validatePetCountForCity('Madison', expectedPetsList)
    
    })
})


test('Validate specialty update', async ({ page }) => {

    const pm = new PageManager(page)

    const testVet = 'Rafael Ortega'
    const oldSpecialty = 'surgery'
    const newSpecialty = 'dermatology'

    await pm.navigateTo().veterinariansPage()
    await pm.onVeterinariansPage().validateSpecialtyFor(testVet, oldSpecialty)

    await pm.navigateTo().specialtiesPage()
    await pm.onSpecialtiesPage().clickEditSpecialtyFor(oldSpecialty)
    await pm.onEditSpecialtyPage().updateSpecialty(oldSpecialty, newSpecialty)

    await pm.navigateTo().veterinariansPage()
    await pm.onVeterinariansPage().validateSpecialtyFor(testVet, newSpecialty)

    await pm.navigateTo().specialtiesPage()
    await pm.onSpecialtiesPage().clickEditSpecialtyFor(newSpecialty)
    await pm.onEditSpecialtyPage().updateSpecialty(newSpecialty, oldSpecialty)

})


test('Validate specialty lists', async ({ page }) => {
    const pm = new PageManager(page)

    const testVet = 'Sharon Jenkins'
    const testSpecialty = 'oncology'

    await pm.navigateTo().specialtiesPage()

    await pm.onSpecialtiesPage().addSpecialty(testSpecialty)
    
    const allSpecialties = await pm.onSpecialtiesPage().getAllSpecialtiesFromSpecialtiesPage()

    await pm.navigateTo().veterinariansPage()
    await pm.onVeterinariansPage().clickEditVeterinarianFor(testVet)
    
    const allSpecialtiesFromDropdown = await pm.onEditVeterinarianPage().getAllSpecialtiesFromDropdown()

    expect(allSpecialtiesFromDropdown).toEqual(allSpecialties)

    await pm.onEditVeterinarianPage().selectSpecialty(testSpecialty)
    await pm.onEditVeterinarianPage().clickSaveVet()
    await pm.onVeterinariansPage().validateSpecialtyFor(testVet, testSpecialty)

    await pm.navigateTo().specialtiesPage()
    await pm.onSpecialtiesPage().deleteSpecialty(testSpecialty)

    await pm.navigateTo().veterinariansPage()
    await pm.onVeterinariansPage().validateSpecialtyFor(testVet, '')

})