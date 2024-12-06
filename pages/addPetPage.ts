import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class AddPetPage extends HelperBase{ 
    
    constructor(page : Page){
        super(page)
    }
    
    async addNewPet(petName: string, birthdate: Date, petType: string){
       
        await this.page.locator('#name').fill(petName)

        // Validate the checkmark appears for text entered in the previous textbox
        await this.page.locator('.glyphicon-ok').isVisible()

        this.selectDateFromCalendarTool(birthdate)

        await expect(this.page.locator('.mat-datepicker-input')).toHaveValue( this.getDateSlashFormat(birthdate) )

        /* 9. Select the type of pet "dog" and click "Save Pet" button */
        await this.page.selectOption('select', petType)

        await this.page.getByText('Save Pet').click()

        /* 10. On the Owner Information page, add assertions for the newly created pet. Name is Tom, Birth Date is in the format "2014-05-02", Type is dog */
        // Select the most recent pet record with new pet information only
        const newPetTable = this.page.locator('app-pet-list').filter({hasText: petName})

        // Assert that the new pet's birthdate and type are correct
        await expect(newPetTable.locator('dd').nth(1)).toHaveText( this.getDateDashFormat(birthdate) )
        await expect(newPetTable.locator('dd').nth(2)).toHaveText(petType)
    }

}