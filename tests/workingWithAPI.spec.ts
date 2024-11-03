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

    // Extracting full name from API Mock to click on link in 
    const testOwnerFullName = `${testOwners[0]['firstName']} ${testOwners[0]['lastName']}`    
    await pm.onOwnersPage().clickOwnerNameFor(testOwnerFullName)
    
    await pm.onOwnerInformationPage().validateOwnerInformation(testOwners[0]['firstName'], testOwners[0]['lastName'], testOwners[0]['address'], testOwners[0]['city'], testOwners[0]['telephone'])

    // Extracting all pet names from API Mock into a list
    const petNameList: string[] = []
    for(let pet of testOwners[0]['pets']){
        petNameList.push(pet['name'])
    }
    await pm.onOwnerInformationPage().validatePetNamesArePresentFromListOfPetNames(petNameList)
    
    // First pet in list should have 10 visits
    const testPetName = petNameList[0]
    await pm.onOwnerInformationPage().validateNumberOfVisitsForPet(testPetName, 10)
})