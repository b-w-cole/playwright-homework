import { Page } from '@playwright/test';
import { HelperBase } from './helperBase';

export class VeterinariansPage extends HelperBase{
    constructor(page : Page){
        super(page)
    }
    
    async editVeterinarian(name: string){
        await this.page.getByRole('row', {name: name}).getByText('Edit Vet').click()
    }
}