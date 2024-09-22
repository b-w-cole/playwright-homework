import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class SpecialtiesPage extends HelperBase{
    
    constructor (page : Page){
        super(page)
    }

    async validateExistenceOf(specialty: string){
        const entries = await this.page.getByRole('textbox').all()

        for(let entry of entries){
            if(specialty === await entry.inputValue()){
                return true
            }
        }
        return false

    }

    async addSpecialty(specialty : string){
        await this.page.getByRole('button', {name: 'Add'}).click()
        await this.page.locator('#name').fill(specialty)
        await this.page.getByText('Save').click()
    }

    async clickEditSpecialtyFor(specialty: string){
        // Edit the 'surgery' specialty via table body rows
        const allRows = await this.page.locator('tbody tr').all()

        // Iterate through rows to find 'surgery'
        for (let row of allRows) {
            // If 'surgery' is found...
            if( await row.locator('input').inputValue() === specialty){
                // ... click 'Edit'
                await row.getByRole('button', { name: 'Edit' }).click()
                break;
            }
        }

        await expect(this.page.locator('h2')).toHaveText('Edit Specialty')
    }

    async deleteSpecialty(specialty : string){

        // Delete the 'oncology' specialty via table body rows
        const allRows = await this.page.locator('tbody tr').all()

        // Iterate through rows to find 'oncology'
        for (let row of allRows) {
            // If 'oncology' is found...
            if( await row.locator('input').inputValue() === specialty){
                // 'Delete' it
                await row.getByText('Delete').click()
                break;
            }
        }

    }

    async getAllSpecialties(){

        await this.page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/specialties*')

        // Collect all specialties and store for later usage
        const allSpecialtyInputs = await this.page.locator('tbody tr').getByRole('textbox').all()
        const allSpecialties : string [] = []

        // Iterate through all the rows to collect the Specialty and store in allSpecialties for future validation
        for(const input of allSpecialtyInputs){
            allSpecialties.push(await input.inputValue())
        }

        return allSpecialties
    }

}