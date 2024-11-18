import { Page, expect  } from '@playwright/test';

export class NavigationPage{
    readonly page : Page
    
    constructor(page : Page){
        this.page = page
    }

    async veterinariansPage(){
        await this.page.getByText("Veterinarians").click();
        await this.page.getByText("All").click()
        await expect(this.page.locator('h2')).toHaveText('Veterinarians')
    }

    async ownersPage(){
        await this.page.getByText('Owners').click()
        await this.page.getByText('Search').click()
        await expect(this.page.locator('h2')).toHaveText('Owners')
        await this.page.waitForSelector('tbody')
    }

    async petTypesPage(){
        await this.page.getByText('Pet Types').click()
        await expect(this.page.locator('h2')).toHaveText('Pet Types')
        await this.page.waitForSelector('tbody')
    }

    async specialtiesPage(){
        await this.page.getByRole('link', {name: 'Specialties'}).click()
        await this.page.waitForSelector('tbody')
        await expect(this.page.locator('h2')).toHaveText('Specialties')
        await this.page.waitForSelector('tbody')
    }

    async home(){
        await this.page.getByRole('link', {name: 'Home'}).click()
    }

}