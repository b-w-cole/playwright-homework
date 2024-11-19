import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class NewOwnerPage extends HelperBase{

    constructor (page : Page){
        super(page)
    }

    async addNewOwner(firstName: string, lastName: string, address: string, city: string, telephone: string){
        await this.page.getByRole('textbox', {name: 'First Name'}).fill(firstName)
        await this.page.getByRole('textbox', {name: 'Last Name'}).fill(lastName)
        await this.page.getByRole('textbox', {name: 'Address'}).fill(address)
        await this.page.getByRole('textbox', {name: 'City'}).fill(city)
        await this.page.getByRole('textbox', {name: 'Telephone'}).fill(telephone)

        await this.page.getByRole('button', {name: 'Add Owner'}).click()
    }

}