import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class EditSpecialtyPage extends HelperBase{ 

    constructor(page : Page){
        super(page)
    }

    async updateSpecialty(oldSpecialty: string, newSpecialty: string){
        // Wait for old value to load
        const specialtyInput = this.page.locator('#name')
        await expect(specialtyInput).toHaveValue(oldSpecialty)

        //Swap old with new value
        await specialtyInput.clear()
        await specialtyInput.fill(newSpecialty)
        await this.page.getByText('Update').click()
    }

}