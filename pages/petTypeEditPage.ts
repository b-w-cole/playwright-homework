import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class PetTypeEditPage extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async fillPetType(petType: string){

        const petTypeInputField = this.page.getByRole('textbox')
        
        await petTypeInputField.click()
        await petTypeInputField.clear()

        await petTypeInputField.fill(petType)
        
        await expect(petTypeInputField).toHaveValue(petType)
    }

    async updatePetType(){
        const petTypeInputField = this.page.getByRole('textbox')

        if(await petTypeInputField.inputValue() === ''){
            await expect(this.page.locator('div', {hasText: 'Name'}).last()).toHaveText('Name is required')
        }
        
        await this.page.getByText('Update').click()
    }

    async cancelPetTypeUpdate(){
        await this.page.getByText('Cancel').click()
    }
}