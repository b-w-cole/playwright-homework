import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager'


test.beforeEach( async({page}) => {
    await page.goto('/')
});

test('Delete Specialty', async ({page, request}) =>{
    const specialtyName = "api testing expert"
    const specialtiesResponse = await request.post('https://petclinic-api.bondaracademy.com/petclinic/api/specialties', {
        data: {
            name: specialtyName
        }
    })
    expect(specialtiesResponse.status()).toEqual(201)
      
    const pm = new PageManager(page)

    await pm.navigateTo().specialtiesPage()

    await pm.onSpecialtiesPage().validateSpecialtyExistsFor(specialtyName)
    
    await pm.onSpecialtiesPage().deleteSpecialty(specialtyName)
    
})

test('Add and Delete Veterinarian', async ({page, request}) => {
    const firstName = 'Paula'
    const lastName = 'Hutchinson'
    const specialty = 'dentistry'

    // Create a new veterinarian
    const veterinarianCreationResponse = await request.post('https://petclinic-api.bondaracademy.com/petclinic/api/vets',{
        data: {
            'id': null,
            'firstName': firstName,
            'lastName': lastName,
            'specialties': []
        }
    })

    // Select and validate specialty for new Vet
    const vetID = (await veterinarianCreationResponse.json()).id
    
    const pm = new PageManager(page)

    await pm.navigateTo().veterinariansPage()

    await pm.onVeterinariansPage().validateSpecialtyCountFor(lastName, 0)

    await pm.onVeterinariansPage().clickEditVeterinarianFor(lastName)

    await pm.onEditVeterinarianPage().selectSpecialty(specialty)

    await pm.onEditVeterinarianPage().clickSaveVet()

    await pm.onVeterinariansPage().validateSpecialtyFor(lastName, specialty)

    // Delete the veterinarian by API
    const deleteResponse = await request.delete(`https://petclinic-api.bondaracademy.com/petclinic/api/vets/${vetID}`)
    expect(deleteResponse.status()).toEqual(204)

    // Get a list of veterinarians by API and validate that our test vet isn't among them
    const getVeterinariansResponse = await request.get('https://petclinic-api.bondaracademy.com/petclinic/api/vets')
    const responseBody = await getVeterinariansResponse.json()
    const testVeterinarian = await responseBody.find(vet => vet.firstName === firstName)
    expect(testVeterinarian).toEqual(undefined)

})

test('New Specialty is Displayed', async ({page, request}) => {
    const firstName = 'Leroy'
    const lastName = 'Jenkins'
    const newSpecialtyName = "api testing ninja"
    const oldSpecialtyJSON = {
        'id': 156, 
        'name': 'surgery'
    }

    // Create a new specialty
    const specialtiesResponse = await request.post('https://petclinic-api.bondaracademy.com/petclinic/api/specialties', {
        data: {
            name: newSpecialtyName
        }
    })
    const newSpecialtyID = (await specialtiesResponse.json()).id
    expect(specialtiesResponse.status()).toEqual(201)

    // Create a test veterinarian
    const veterinarianCreationResponse = await request.post('https://petclinic-api.bondaracademy.com/petclinic/api/vets',{
        data: {
            'id': null,
            'firstName': firstName,
            'lastName': lastName,
            'specialties': [oldSpecialtyJSON]
        }
    })
    const vetID = (await veterinarianCreationResponse.json()).id
    expect(veterinarianCreationResponse.status()).toEqual(201)

    // Select the new specialty and remove the old one for the test vet
    const pm = new PageManager(page)

    await pm.navigateTo().veterinariansPage()

    await pm.onVeterinariansPage().validateSpecialtyFor(firstName, oldSpecialtyJSON.name)

    await pm.onVeterinariansPage().clickEditVeterinarianFor(firstName)
    
    await pm.onEditVeterinarianPage().selectSpecialty(newSpecialtyName)

    await pm.onEditVeterinarianPage().deselectSpecialty(oldSpecialtyJSON.name)

    await pm.onEditVeterinarianPage().clickSaveVet()

    await pm.onVeterinariansPage().validateSpecialtyFor(firstName, newSpecialtyName)

    // Delete the test vet before deleting the new specialty
    const deleteVeterinarianResponse = await request.delete(`https://petclinic-api.bondaracademy.com/petclinic/api/vets/${vetID}`)
    expect(deleteVeterinarianResponse.status()).toEqual(204)

    // Delete the new specialty
    const deleteSpecialtyResponse = await request.delete(`https://petclinic-api.bondaracademy.com/petclinic/api/specialties/${newSpecialtyID}`)
    expect(deleteSpecialtyResponse.status()).toEqual(204)

})