import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class OwnerInformationPage extends HelperBase{ 

    constructor(page : Page){
        super(page)
    }

    async validateOwnerName(ownerName: string){
        await expect(this.page.locator('.ownerFullName')).toHaveText(ownerName)
    }

    async validatePetType(petName: string, petType: string){
        const rosyPetType = this.page.getByText(petName).locator('..').locator('dd').last()
        await expect(rosyPetType).toHaveText(petType)

    }

    async clickAddPet(){
        
        await this.page.getByRole('button', {name: 'Add New Pet'}).click()

    }

    async editPet(petName: string){
        await this.page.getByText(petName).locator('..').getByRole('button', {name: 'Edit Pet'}).click()
    }

    async deletePet(petName: string){
        await this.page.getByText(petName).locator('..').getByRole('button', {name: 'Delete'}).click()
        
        // Wait for delete to complete
        await this.page.waitForResponse("https://petclinic-api.bondaracademy.com/petclinic/api/pets/*")

        // Validate that the pet isn't present anymore
        const petRows = this.page.locator('dd').all()

        for(let petInfo of await petRows){
            await expect(petInfo).not.toHaveText(petName)
        }
    }

    async clickAddVisit(petName: string){

        await this.page.locator('app-pet-list', {hasText: petName}).getByText('Add Visit').click()

    }

    async deleteVisit(petName: string, visitDate: Date){
        const formattedDate = this.getDateDashFormat(visitDate)
        await this.page.locator('app-pet-list', {hasText: petName}).locator('app-visit-list tr', {hasText: formattedDate}).getByText('Delete Visit').click()
        await this.page.waitForResponse("https://petclinic-api.bondaracademy.com/petclinic/api/visits/*")

        const petAppointments = this.page.locator('app-pet-list', {hasText: petName}).locator('app-visit-list tr')

        for(const row of await petAppointments.all()){
            expect(await row.textContent()).not.toContain(formattedDate)
        }
    }

    async validateVisitDateDisplayForTopVisit(petName: string, appointmentDate: Date){
        const formatedDate = this.getDateDashFormat(appointmentDate)
        await expect(this.page.locator('app-pet-list', {hasText: petName}).locator('app-visit-list tr td').first()).toHaveText(formatedDate)
    }

    async compareOrderOfTopTwoVisitsByDate(petName: string){
        const petAppointments = this.page.locator('app-pet-list', {hasText: petName}).locator('app-visit-list tr')
        // Validate that the two appointments are listed in chronological order
        const petLaterAppointmentDate = await petAppointments.nth(1).locator('td').first().textContent()
        const petInitialAppointmentDate = await petAppointments.nth(2).locator('td').first().textContent()
        
        // The older appointment should be the smaller number
        expect(Date.parse(petInitialAppointmentDate!) < Date.parse(petLaterAppointmentDate!)).toBeTruthy()
    }

}