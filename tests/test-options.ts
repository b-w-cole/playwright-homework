import { test as base } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { RandomDataHelper } from '../pages/randomDataHelper'
import { APIHelper} from '../pages/apiHelper'


export type TestOptions = {
    pageManager: PageManager
    newOwnerFixture: {
        'firstName': string,
        'lastName': string,
        'address': string,
        'city': string,
        'telephone': string,
        'petName': string,
        'petBirthdate': Date,
        'petType': string,
        'visitDate': Date,
        'visitDescription': string
    }
}

export const test = base.extend<TestOptions>({

    pageManager: [async ({ page }, use) => {
        const pm = new PageManager(page)

        await use(pm)

    }, {auto: true}],

    newOwnerFixture: async ({ pageManager, request }, use) => {
        const randomDataHelper = new RandomDataHelper()

        const testVars = {
            'firstName': randomDataHelper.getFirstName(),
            'lastName': randomDataHelper.getLastName(),
            'address': randomDataHelper.getAddress(),
            'city': randomDataHelper.getCity(),
            'telephone': randomDataHelper.getPhone(),
            'petName': randomDataHelper.getPetName(),
            'petBirthdate': randomDataHelper.getPetBirthdate(),
            'petType': randomDataHelper.getRandomPetType(),
            'visitDate': new Date(),
            'visitDescription': randomDataHelper.getVisitDescription()
        }

        const apiHelper = new APIHelper(request)

        await pageManager.navigateTo().ownersPage()

        await pageManager.onOwnersPage().clickAddOwner()
        
        const ownerID = await pageManager.onNewOwnerPage().addNewOwner(testVars.firstName, testVars.lastName, testVars.address, testVars.city, testVars.telephone)

        await pageManager.onOwnersPage().clickOwnerNameFor(`${testVars.firstName} ${testVars.lastName}`)

        await pageManager.onOwnerInformationPage().clickAddPet()

        await pageManager.onAddPetPage().addNewPet(testVars.petName, testVars.petBirthdate, testVars.petType)
        
        await pageManager.onOwnerInformationPage().clickAddVisit(testVars.petName)
        
        await pageManager.onNewVisitPage().addVisit(testVars.visitDate, testVars.visitDescription)

        await use(testVars)

        await apiHelper.deleteOwnerByID(ownerID)
    }
})