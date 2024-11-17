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
        const vetSpecialties = await vetRow.getByRole('cell').nth(1).textContent()
        const specialtiesArray = vetSpecialties?.split('  ')!

        let specialtiesLength = specialtiesArray.length
        if(specialtiesLength == 1 && specialtiesArray[0] === ''){
            specialtiesLength = 0
        }
        
        expect(specialtiesLength).toEqual(count)
    }
}