import { Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class SpecialtiesPage extends HelperBase{
    
    constructor (page : Page){
        super(page)
    }

    async addSpecialty(specialty : string){
        await this.page.getByRole('button', {name: 'Add'}).click()
        await this.page.locator('#name').fill(specialty)
        await this.page.getByText('Save').click()
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

    async editSpecialty(specialty : string){

    }

}