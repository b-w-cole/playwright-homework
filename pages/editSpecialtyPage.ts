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

        await this.page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/specialties*')
        
        // Collect all specialties and store for later usage
        const allSpecialties = await this.page.locator('tbody tr').getByRole('textbox').all()
        expect(allSpecialties.length).toBeGreaterThan(0)
        
        const allSpecialtyValues: string[] = []
        
        // Iterate through all the rows to collect the Specialty and store in allSpecialties for future validation
        for(let input of allSpecialties){
            allSpecialtyValues.push(await input.inputValue())
        }

        // Confirm that the specialty is available on the page
        expect(allSpecialtyValues).toContainEqual(newSpecialty)
    }

}