import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class VeterinariansPage extends HelperBase{
    constructor(page : Page){
        super(page)
    }
    
    async clickEditVeterinarianFor(name: string){
        await this.page.getByRole('row', {name: name}).getByText('Edit Vet').click()
    }

    async validateSpecialty(veterinarianName: string, specialty: string){
        await expect(this.page.getByRole('row', {name: veterinarianName}).getByRole('cell').nth(1)).toHaveText(specialty)
    }


}