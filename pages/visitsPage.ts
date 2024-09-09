import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class VisitsPage extends HelperBase{ 

    constructor(page : Page){
        super(page)
    }

    async validatePetAndOwnerInfoAreDisplayedCorrectly(petName: string, ownerName: string){
        await expect(this.page.locator('table').first().locator('td').first()).toHaveText(petName)
        await expect(this.page.locator('table').first().locator('td').last()).toHaveText(ownerName)
    }

    async addVisit(visitDate: Date, visitDescription: string){
        
        await this.selectDateFromCalendarTool(visitDate)

        await expect(this.page.locator('.mat-datepicker-input')).toHaveValue( this.getDateSlashFormat(visitDate) )

        await this.page.locator('#description').fill(visitDescription)

        await this.page.getByText('Add Visit').click()
        
    }

}