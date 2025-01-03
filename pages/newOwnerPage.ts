import { Page, Locator } from '@playwright/test';
import { HelperBase } from './helperBase';

export class NewOwnerPage extends HelperBase{

    constructor (page : Page){
        super(page)
    }

    async clickAddNewOwner(): Promise<string>{
        await this.page.getByRole('button', {name: 'Add Owner'}).click()

        const response = await this.page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/owners*')
        return (await response.json()).id
    }

    async fillNewOwnerForm(firstName: string, lastName: string, address: string, city: string, telephone: string){
        await this.page.getByRole('textbox', {name: 'First Name'}).fill(firstName)
        await this.page.getByRole('textbox', {name: 'Last Name'}).fill(lastName)
        await this.page.getByRole('textbox', {name: 'Address'}).fill(address)
        await this.page.getByRole('textbox', {name: 'City'}).fill(city)
        await this.page.getByRole('textbox', {name: 'Telephone'}).fill(telephone)
    }

    async getNewOwnerFormLocatorForVisualTesting(): Promise<Locator>{
        return this.page.locator('app-owner-add')
    }

}