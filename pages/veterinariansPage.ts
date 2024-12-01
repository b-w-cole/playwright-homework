import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class VeterinariansPage extends HelperBase{
    constructor(page : Page){
        super(page)
    }
    
    async clickEditVeterinarianFor(name: string){
        await this.page.getByRole('row', {name: name}).getByText('Edit Vet').click()
    }

    async validateSpecialtyFor(veterinarianName: string, specialty: string){
        await expect(this.page.getByRole('row', {name: veterinarianName}).getByRole('cell').nth(1)).toHaveText(specialty)
    }

    async validateSpecialtyCountFor(veterinarianName: string, count: number){
        const vetRow = this.page.getByRole('row', {name: veterinarianName})

        await this.page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/vets*')

        const vetSpecialties = await vetRow.getByRole('cell').nth(1).textContent()
        if(count == 0){
            expect(vetSpecialties).toHaveLength(0)
        }
        else{
            expect(vetSpecialties?.split('  ')).toHaveLength(count)
        }
    }
}