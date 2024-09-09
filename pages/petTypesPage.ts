import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class PetTypesPage extends HelperBase{
 
    constructor (page : Page){
        super(page)
    }

    async addPetType(petType: string){
        await this.page.getByRole('button', {name: 'Add'}).click()
        
        // Validate that the new section for pet type entry appears correctly
        await expect(this.page.locator('h2').nth(1)).toHaveText('New Pet Type')
        await expect(this.page.locator('label')).toHaveText('Name')
        const input = this.page.locator('#name')
        await expect(input).toBeVisible()

        /* 5. Add a new pet type with the name "pig" and click "Save" button */
        await input.click()
        await input.fill(petType)
        await this.page.getByText('Save').click()

        // Validate that the new Pet Type has been added
        await expect(this.page.locator('table input').last()).toHaveValue(petType)
    }

    async editPetType(oldPetType: string){

        await this.page.waitForSelector('tbody tr')

        const allRows = await this.page.locator('tbody tr').all()

        // Iterate through rows to find pet type
        for (let row of allRows) {
            // If 'pet type' is found...
            if( await row.locator('input').inputValue() === oldPetType){
                // ... click 'Edit'
                await row.getByRole('button', { name: 'Edit' }).click()
                break;
            }
        }

    }

    async removePetType(petType: string){

        // Add a listener for the dialog box
        this.page.on('dialog', dialog => {
            // Assert that the correct message is displayed in the dialog box
            expect(dialog.message()).toEqual('Delete the pet type?')

            // Click 'ok'
            dialog.accept()
        })

        await this.page.getByText('Delete').last().click()

        // Validate that the pet type was removed
        await expect(this.page.getByRole('textbox').last()).not.toHaveValue(petType)
    }

    async validatePetTypeEntryByRowPosition(petType: string, i: number){
        await expect(this.page.locator('input[name=pettype_name]').nth(i)).toHaveValue(petType)
    } 

}