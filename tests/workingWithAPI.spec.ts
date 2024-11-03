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

test('mocking API request', async ({page}) => {
    const pm = new PageManager(page)
    
    await pm.navigateTo().ownersPage()

    await pm.onOwnersPage().validateOwnerCount(2)

    // Capturing data from the testOwners JSON file, which contains information to be displayed on the Owners Page
    const testOwnerFullName = `${testOwners[0]['firstName']} ${testOwners[0]['lastName']}`
    
    await pm.onOwnersPage().clickOwnerNameFor(testOwnerFullName)
    
    // Specific owner information from the testOwners file should be displayed on the Owner Information page
    await pm.onOwnerInformationPage().validateOwnerInformation(testOwners[0]['firstName'], testOwners[0]['lastName'], testOwners[0]['address'], testOwners[0]['city'], testOwners[0]['telephone'])

    await pm.onOwnerInformationPage().validatePetNamesArePresentFromListOfPetNames([testOwners[0]['pets'][0]['name'], testOwners[0]['pets'][1]['name']])
    
    await pm.onOwnerInformationPage().validateNumberOfVisits(10)
})