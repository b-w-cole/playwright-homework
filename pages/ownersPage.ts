import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class OwnersPage extends HelperBase{

    constructor (page : Page){
        super(page)
    }

    async getOwnerRow(owner : string){
        await this.page.waitForSelector('tbody')
        return this.page.getByRole('row', {name: owner})
    }

    async clickOwnerNameFor(ownerName: string){
        await this.page.getByText(ownerName).click()
    }

    async validatePetAndCityOfOwner(owner: string, petName: string, city: string){
        const row = this.page.getByRole('row', {name: owner})
    
        // Validate the owner is from Monona
        await expect(row.locator('td').nth(2)).toHaveText(city)
    
        // Validate the owner has a pet named Lucky
        await expect(row.locator('td').nth(4)).toHaveText(petName)
        
    }

    async getOwnerCountForCity(city: string){
        return this.page.getByRole('row', {name: city}).all()
    }

    async validateOwnerCountForCity(city: string, count: number){
        await expect(this.page.getByRole('row', {name: city})).toHaveCount(count)
    }

    async validatePetCountForCity(city: string, petList: string[]){
         await this.page.waitForSelector('table')

         const allRows = await this.getOwnerCountForCity(city)
        
        let actualPetsList: string[] = []
    
        // Iterate through the rows to extract the pet names
        for(const row of allRows){
            // Add the pet name to the comparing list of names, with each name trimmed of excess white space
            actualPetsList.push( (await row.getByRole('cell').nth(4).textContent())?.trim()! )
        }
    
        // Comparing both sorted lists for equality
        expect (actualPetsList.sort()).toEqual(petList.sort())

    }

    async searchForOwnerByLastNameAndValidateOwnerExistsFor(ownerLastName: string){
        await this.page.getByRole('textbox').fill(ownerLastName)
        await this.page.getByText('Find Owner').click()
        
        await this.page.waitForResponse("https://petclinic-api.bondaracademy.com/petclinic/api/owners?lastName*")

        // Capture the rows in the table body pertaining to the owner
        const rows = await this.page.locator('.ownerFullName').all()

        for(const row of rows){

            // Checking if the name isn't our negative test, 'Playwright'.
            if(ownerLastName !== 'Playwright'){
                await expect(row).toContainText(ownerLastName) 
            }
            else{
                /* 9. Add the assertion of the message "No owners with LastName starting with "Playwright"" */
                // If we get an unknown name, the message below should be displayed
                await expect(this.page.locator('div.container.xd-container div').last()).toHaveText('No owners with LastName starting with \"Playwright\"')
            }
        }
    }

    async getPetNameByPhoneNumber(phoneNumber: string){
        return this.page.getByRole('row', {name: phoneNumber}).locator('td').nth(4).textContent()
    }

    async getOwnerByPhoneNumber(phoneNumber: string){
        return this.page.getByRole('row', {name: phoneNumber}).getByRole('link').textContent()
    }

    async validateOwnerCount(numberOfOwners: number){
        await this.page.waitForSelector('tbody')

        await expect(this.page.locator('tbody').locator('.ownerFullName')).toHaveCount(numberOfOwners)
    }

}