import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class PetDetailsPage extends HelperBase{ 
    
    constructor(page : Page){
        super(page)
    }

    async validateNameOwnerAndPetTypeFieldsDisplayCorrectly(petName: string, owner: string, petType: string){
        // Validate that the name input field is correct
        await expect(this.page.locator('#name')).toHaveValue(petName)
        await expect(this.page.locator('#owner_name')).toHaveValue(owner)
        await expect(this.page.locator('#type1')).toHaveValue(petType)

    }

    async validateAllPetTypesDisplayCorrectly(){

        // Iterate through each pet type option to validate that the pet is correctly listed in the textbox to the left 
        const allPetTypeOptions = await this.page.locator("option").allTextContents()

        for(const petType of allPetTypeOptions){

            await this.page.selectOption('select', petType)
            
            // Validate that the pet is correctly displayed in the textbox
            await expect(this.page.locator('#type1')).toHaveValue(petType)
        }
    }


    async selectNewPetTypeAndUpdate(petType: string){

        await this.page.selectOption('select', petType)

        await expect(this.page.locator('#type1')).toHaveValue(petType)

        await this.page.getByText('Update Pet').click()

    }

    async fillPetDetailsAndUpdate(petName: string, birthdate: Date, petType: string){
       
        await this.page.locator('#name').fill(petName)

        // Validate the checkmark appears for text entered in the previous textbox
        await this.page.locator('.glyphicon-ok').isVisible()

        this.selectDateFromCalendarTool(birthdate)

        await expect(this.page.locator('.mat-datepicker-input')).toHaveValue( this.getDateSlashFormat(birthdate) )

        /* 9. Select the type of pet "dog" and click "Save Pet" button */
        await this.page.selectOption('select', petType)

        await this.page.getByText('Save Pet').click()

        /* 10. On the Owner Information page, add assertions for the newly created pet. Name is Tom, Birth Date is in the format "2014-05-02", Type is dog */
        // Select the most recent pet record with pet information only
        const newPetTable = this.page.locator('app-pet-list').last().locator('dl').first()

        // Assert that the new pet's name, birthdate, and type are correct
        await expect(newPetTable.locator('dd').first()).toHaveText('Tom')
        await expect(newPetTable.locator('dd').nth(1)).toHaveText( this.getDateDashFormat(birthdate) )
        await expect(newPetTable.locator('dd').nth(2)).toHaveText('dog')
    }
}