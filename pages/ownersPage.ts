import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class OwnersPage extends HelperBase{

    constructor (page : Page){
        super(page)
    }

    async getOwnerRow(owner : string){
        await this.page.waitForSelector('tbody')
        console.log(await this.page.getByRole('row', {name: owner}).allTextContents())
        return this.page.getByRole('row', {name: owner})
    }

    async selectOwner(owner: string){
        await this.page.getByText(owner).click()
    }

    async validatePetNameAndCityForOwner(petName: string, petOwner: string, city: string){
        const row = this.page.getByRole('row', {name: 'Jeff Black'})
    
        // Validate the owner is from Monona
        await expect(row.locator('td').nth(2)).toHaveText('Monona')
    
        // Validate the owner has a pet named Lucky
        await expect(row.locator('td').nth(4)).toHaveText('Lucky')
        
    }

    async validatePetNumberPerCity(city: string){
        await expect(this.page.getByRole('row', {name: city})).toHaveCount(4)
    }
}