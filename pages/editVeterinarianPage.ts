import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class EditVeterinarianPage extends HelperBase{
    constructor(page : Page){
        super(page)
    }

    async clickSaveVet(){
        await this.closeDropdownIfOpen()
        await this.page.getByText('Save Vet').click()
    }

    async validateSpecialtyDisplayedIs(specialty: string){
        await expect(this.page.locator('.selected-specialties')).toHaveText(specialty)
    }

    async validateOnlySpecialtyCheckedIs(specialty: string){
        await this.openDropdownIfClosed()

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
        await this.openDropdownIfClosed()
        await this.page.getByRole('checkbox', {name: specialty}).check()
    }

    async deselectSpecialty(specialty: string){
        await this.openDropdownIfClosed()
        await this.page.getByRole('checkbox', {name: specialty}).uncheck()

    }

    async selectAllSpecialties(){
        await this.openDropdownIfClosed()
        
        const allCheckboxes = this.page.getByRole('checkbox')
        
        for(const checkbox of await allCheckboxes.all()){
            await checkbox.check()
            await expect(checkbox).toBeChecked()
        }
    }

    async deselectAllSpecialties(){
        await this.openDropdownIfClosed()

        const allCheckboxes = this.page.getByRole("checkbox")
    
        for(const checkbox of await allCheckboxes.all()){
            await checkbox.uncheck()
            await expect(checkbox).not.toBeChecked()
        }
    }

    async getAllSpecialtiesFromDropdown(){
        await this.openDropdownIfClosed()

        const allSpecialties = await this.page.locator('.dropdown-content').locator('label').allTextContents()

        return allSpecialties
    }

    private async openDropdownIfClosed(){
        // Validating the dropdown isn't already opened by checking to see if checkbox list is visible.
        if(! await this.page.locator('.dropdown-content').isVisible()){
           await this.page.locator('.dropdown-display').click()
        }
    }

    private async closeDropdownIfOpen(){
        if(await this.page.locator('.dropdown-content').isVisible()){
            await this.page.locator('.dropdown.show').click()
         }
    }

}