import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'
import testOwners from '../test-data/testOwners.json'
import testVetSpecialties from '../test-data/testVetSpecialties.json'

test.beforeEach( async({page}) => {
    page.route('*/**/owners', async route => {
        await route.fulfill({
            body: JSON.stringify(testOwners)
        })    
    })

    page.route('*/**/owners/1', async route => {
        await route.fulfill({
            body: JSON.stringify(testOwners[0])
        })    
    })

    await page.route('*/**/api/vets*', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()

        const vet = responseBody.find(vet => vet.firstName === 'Sharon')
        vet.specialties = testVetSpecialties

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })

    })

    await page.goto('/')
});

test('Mocking API request', async ({page}) => {

    const pm = new PageManager(page)
    
    await pm.navigateTo().ownersPage()

    await pm.onOwnersPage().validateOwnerCount(2)

    // Extracting full name from API Mock to click on link in 
    const owner = testOwners.find(owner => owner.id === 1)!
    const testOwnerFullName: string = `${owner.firstName} ${owner.lastName}`
    await pm.onOwnersPage().clickOwnerNameFor(testOwnerFullName)
    
    await pm.onOwnerInformationPage().validateOwnerInformation(testOwnerFullName, owner.address, owner.city, owner.telephone)

    const petNames: string[] = owner.pets.map(pet => pet.name)
    await pm.onOwnerInformationPage().validatePetNamesArePresentFromListOfPetNames(petNames)
    
    // First pet in list should have 10 visits
    await pm.onOwnerInformationPage().validateNumberOfVisitsForPetName(petNames[0], 10)
})

test('Intercepting API Response', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().veterinariansPage()

    await pm.onVeterinariansPage().validateSpecialtyCountFor('Sharon Jenkins', 10)
})