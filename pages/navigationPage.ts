import { Page } from '@playwright/test';

export class NavigationPage{
    readonly page : Page
    
    constructor(page : Page){
        this.page = page
    }

    async veterinariansPage(){
        await this.page.getByText("Veterinarians").click();
        await this.page.getByText("All").click()
    }

    async ownersPage(){
        await this.page.getByText('Owners').click()
        await this.page.getByText('Search').click()
    }

    async petTypesPage(){
        await this.page.getByText('Pet Types').click()
    }

    async specialtiesPage(){
        await this.page.getByRole('link', {name: 'Specialties'}).click()
        await this.page.waitForSelector('tbody')
    }

}