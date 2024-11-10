import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'
import testOwners from '../test-data/testOwners.json'

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

    await page.goto('/')

});

test('Mocking API request', async ({page}) => {
    const pm = new PageManager(page)
    
    await pm.navigateTo().ownersPage()

    await pm.onOwnersPage().validateOwnerCount(2)

    // Extracting full name from API Mock to click on link in 
    const owner = testOwners.find(owner => owner.id === 1)
    const testOwnerFullName: string = `${owner?.firstName} ${owner?.lastName}`
    await pm.onOwnersPage().clickOwnerNameFor(testOwnerFullName)
    
    await pm.onOwnerInformationPage().validateOwnerInformation(testOwnerFullName, owner?.address!, owner?.city!, owner?.telephone!)

    await pm.onOwnerInformationPage().validatePetNamesArePresentFromListOfPets(owner?.pets!)
    
    // First pet in list should have 10 visits
    const pet = owner?.pets.find(pet => pet.id === 1)
    await pm.onOwnerInformationPage().validateNumberOfVisitsForPetName(pet?.name!, 10)
})