import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class EditPetPage extends HelperBase{ 
    
    constructor(page : Page){
        super(page)
    }

    async validateNameOwnerAndPetTypeFieldsDisplayCorrectly(petName: string, owner: string, petType: string){
        // Validate that the name input field is correct
        await expect(this.page.locator('#name')).toHaveValue(petName)
        await expect(this.page.locator('#owner_name')).toHaveValue(owner)
        await expect(this.page.locator('#type1')).toHaveValue(petType)

    }

    async validateAllPetValuesFromDropdownDisplayedInPetTypeField(){

        // Iterate through each pet type option to validate that the pet is correctly listed in the textbox to the left 
        const allPetTypeOptions = await this.page.locator("option").allTextContents()

        for(const petType of allPetTypeOptions){

            await this.page.selectOption('select', petType)
            
            // Validate that the pet is correctly displayed in the textbox
            await expect(this.page.locator('#type1')).toHaveValue(petType)
        }
    }

    async updatePetTypeTo(petType: string){

        await this.page.selectOption('select', petType)

        await expect(this.page.locator('#type1')).toHaveValue(petType)

        await this.page.getByText('Update Pet').click()

    }

}