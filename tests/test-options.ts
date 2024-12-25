import { test as base } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { RandomDataHelper } from '../pages/randomDataHelper'
import { APIHelper} from '../pages/apiHelper'


export type TestOptions = {
    pageManager: PageManager
    newOwnerFixture: [{
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
    }]
}

function setOwnerPetAndVisitVariables(){
    const randomDataHelper = new RandomDataHelper()
    const testVars = {
        'firstName': randomDataHelper.getFirstName(),
        'lastName': randomDataHelper.getLastName(),
        'address': randomDataHelper.getAddress(),
        'city': randomDataHelper.getCity(),
        'telephone': randomDataHelper.getPhone(),
        'petName': randomDataHelper.getPetName(),
        'petBirthdate': randomDataHelper.getPetBirthdate(),
        'petType': randomDataHelper.getPresetPetType(),
        'visitDate': new Date(),
        'visitDescription': randomDataHelper.getVisitDescription()

    }
    return testVars
}

export const test = base.extend<TestOptions>({

    pageManager: [async ({ page }, use) => {
        const pm = new PageManager(page)

        await use(pm)

    }, {auto: true}],

    newOwnerFixture: async ({ pageManager, request }, use) => {
        const testVars = setOwnerPetAndVisitVariables()

        const firstName = testVars.firstName
        const lastName = testVars.lastName
        const address = testVars.address
        const city = testVars.city
        const telephone = testVars.telephone
        const petName = testVars.petName
        const petBirthdate = testVars.petBirthdate
        const petType = testVars.petType
        const visitDate = testVars.visitDate
        const visitDescription = testVars.visitDescription

        const apiHelper = new APIHelper(request)

        await pageManager.navigateTo().ownersPage()

        await pageManager.onOwnersPage().clickAddOwner()
        

        const ownerID = await pageManager.onNewOwnerPage().addNewOwner(firstName, lastName, address, city, telephone)

        await pageManager.onOwnersPage().clickOwnerNameFor(`${firstName} ${lastName}`)

        await pageManager.onOwnerInformationPage().clickAddPet()

        await pageManager.onAddPetPage().addNewPet(petName, petBirthdate, petType)
        
        await pageManager.onOwnerInformationPage().clickAddVisit(petName)
        
        await pageManager.onNewVisitPage().addVisit(visitDate, visitDescription)

        await use([{
            'firstName': firstName, 
            'lastName':lastName,
            'address': address,
            'city': city,
            'telephone': telephone,
            'petName': petName,
            'petBirthdate': petBirthdate,
            'petType': petType,
            'visitDate': visitDate,
            'visitDescription': visitDescription
        }])

        await apiHelper.deleteOwnerByID(ownerID)
    }
})