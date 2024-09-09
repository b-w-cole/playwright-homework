import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class VeterinarianDetailsPage extends HelperBase{
    constructor(page : Page){
        super(page)
    }

    async validateSpecialtyDisplayedIs(specialty: string){
        await expect(this.page.locator('.selected-specialties')).toHaveText(specialty)
    }

    async validateOnlySpecialtyCheckedIs(specialty: string){
        await this.openDropdown()

        const specialties = await this.page.getByRole('checkbox').all()
        
        for(let i = 0; i < specialties.length; i++){
            if(await specialties[i].textContent() === specialty){
                await expect(specialties[i]).toBeChecked()
            }
            else{
                expect(specialties[i]).not.toBeChecked
            }
        }
    }

    async selectSpecialty(specialty: string){
        await this.openDropdown()
        await this.page.getByRole('checkbox', {name: specialty}).check()
    }

    async deselectSpecialty(specialty: string){
        await this.openDropdown()
        await this.page.getByRole('checkbox', {name: specialty}).uncheck()

    }

    async selectAllSpecialties(){
        await this.openDropdown()
        
        const allCheckboxes = this.page.getByRole('checkbox')
        
        for(const checkbox of await allCheckboxes.all()){
            await checkbox.check()
            await expect(checkbox).toBeChecked()
        }
    }

    async deselectAllSpecialties(){
        await this.openDropdown()

        const allCheckboxes = this.page.getByRole("checkbox")
    
        for(const checkbox of await allCheckboxes.all()){
            await checkbox.uncheck()
            await expect(checkbox).not.toBeChecked()
        }
    }

    private async openDropdown(){
        // Validating the dropdown isn't already opened by checking to see if checkbox list is visible.
        if(! await this.page.locator('.dropdown-content').isVisible()){
           await this.page.locator('.selected-specialties').click()
        }
    }

}