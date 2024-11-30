import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'
import { APIHelper } from '../pages/apiHelper';


test.beforeEach( async({page}) => {
    await page.goto('/')
});

test('Delete Specialty', async ({page, request}) =>{

    const specialtyName = "api testing expert"

    const pm = new PageManager(page)
    const apiHelper = new APIHelper(request)  

    await apiHelper.createSpecialtyAndGetID(specialtyName)

    await pm.navigateTo().specialtiesPage()

    await pm.onSpecialtiesPage().validateExistenceOfSpecialtyName(specialtyName, true)
    
    await pm.onSpecialtiesPage().deleteSpecialty(specialtyName)
    
})

test('Add and Delete Veterinarian', async ({page, request}) => {
    const firstName = 'Paula'
    const lastName = 'Hutchinson'
    const originalSpecialties = []
    const newSpecialty = 'dentistry'
    
    
    const pm = new PageManager(page)
    const apiHelper = new APIHelper(request)

    const vetID = await apiHelper.createNewVeteranarianAndGetID(firstName, lastName, originalSpecialties)

    await pm.navigateTo().veterinariansPage()

    await pm.onVeterinariansPage().validateSpecialtyCountFor(lastName, 0)

    await pm.onVeterinariansPage().clickEditVeterinarianFor(lastName)

    await pm.onEditVeterinarianPage().selectSpecialty(newSpecialty)

    await pm.onEditVeterinarianPage().clickSaveVet()

    await pm.onVeterinariansPage().validateSpecialtyFor(lastName, newSpecialty)

    await apiHelper.deleteVeterinarian(vetID)

    await apiHelper.validateVeterinarianDoesNotExist(vetID)

})

test('New Specialty is Displayed', async ({page, request}) => {
    const firstName = 'Leroy'
    const lastName = 'Jenkins'
    const newSpecialtyName = "api testing ninja"
    const oldSpecialtyName = 'surgery'

    // Select the new specialty and remove the old one for the test vet
    const pm = new PageManager(page)
    const apiHelper = new APIHelper(request)

    const oldSpecialtyJSON = await apiHelper.getSpecialtyJSON(oldSpecialtyName)
    
    const veterinarianID  = await apiHelper.createNewVeteranarianAndGetID(firstName, lastName, [oldSpecialtyJSON])

    const newSpecialtyID = await apiHelper.createSpecialtyAndGetID(newSpecialtyName)

    await pm.navigateTo().veterinariansPage()

    await pm.onVeterinariansPage().validateSpecialtyFor(firstName, oldSpecialtyJSON.name)

    await pm.onVeterinariansPage().clickEditVeterinarianFor(firstName)

    await pm.onEditVeterinarianPage().selectSpecialty(newSpecialtyName)

    await pm.onEditVeterinarianPage().deselectSpecialty(oldSpecialtyJSON.name)

    await pm.onEditVeterinarianPage().clickSaveVet()

    await pm.onVeterinariansPage().validateSpecialtyFor(firstName, newSpecialtyName)

    // Delete the test vet before deleting the new specialty
    await apiHelper.deleteVeterinarian(veterinarianID)

    // Delete the new specialty
    await apiHelper.deleteSpecialty(newSpecialtyID)

})