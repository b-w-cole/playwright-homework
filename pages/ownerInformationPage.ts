import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class OwnerInformationPage extends HelperBase{ 

    constructor(page : Page){
        super(page)
    }

    async clickAddPet(){
        
        await this.page.getByRole('button', {name: 'Add New Pet'}).click()
        await expect(this.page.locator('h2')).toHaveText('Add Pet')
    }

    async clickEditPetFor(petName: string){
        await this.page.getByText(petName).locator('..').getByRole('button', {name: 'Edit Pet'}).click()
        await expect(this.page.locator('h2')).toHaveText('Pet')
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
        await expect(this.page.locator('h2')).toHaveText('New Visit')

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

    async validateTwoLastVisitsInDesendOrder(petName: string){
        const petAppointments = this.page.locator('app-pet-list', {hasText: petName}).locator('app-visit-list tr')
        // Validate that the two appointments are listed in chronological order
        const petLaterAppointmentDate = await petAppointments.nth(1).locator('td').first().textContent()
        const petInitialAppointmentDate = await petAppointments.nth(2).locator('td').first().textContent()
        
        // The older appointment should be the smaller number
        expect(Date.parse(petInitialAppointmentDate!) < Date.parse(petLaterAppointmentDate!)).toBeTruthy()
    }

    async validatePhoneNumberAndPets(phoneNumber: string, petName: string){
        // Validate that the phone number is listed correctly
        await expect(this.page.getByRole('row', {name: 'Telephone'}).getByRole('cell').last()).toHaveText(phoneNumber)

        // Validate the correct pet name by finding 'name' in the first pet information table
        await expect(this.page.locator('div.container.xd-container').locator('dd').first()).toContainText(petName)
    }

    async validateOwnerName(ownerName: string){
        await expect(this.page.locator('.ownerFullName')).toHaveText(ownerName)
    }

    async validatePetType(petName: string, petType: string){
        const recievedPetType = this.page.getByText(petName).locator('..').locator('dd').last()
        await expect(recievedPetType).toHaveText(petType)

    }

    async validateOwnerInformation(firstName: string, lastName: string, address: string, city: string, telephone: string){       
        const ownerTable = this.page.getByRole('table').filter({hasText: 'Address'})

        await expect(ownerTable.getByRole('row', {name: 'Name'})).toContainText(`${firstName} ${lastName}`)
        await expect(ownerTable.getByRole('row', {name: 'Address'})).toContainText(address)
        await expect(ownerTable.getByRole('row', {name: 'City'})).toContainText(city)
        await expect(ownerTable.getByRole('row', {name: 'Telephone'})).toContainText(telephone)
        
    }

    async validatePetNamesArePresentFromListOfPetNames(petNames: string[]){
        const allPetInformationTables = await this.page.locator('table app-pet-list').all()

        for(let i in petNames){
            await expect(allPetInformationTables[i]).toContainText(petNames[i])
        }
    }

    async validateNumberOfVisitsForPet(petName: string, visitsCount: number){
        expect((await this.page.locator('table app-pet-list', {hasText: petName}).locator('app-visit-list').getByRole('row').all()).slice(1)).toHaveLength(visitsCount)
    }

}