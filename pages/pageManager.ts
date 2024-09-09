import { Page } from "@playwright/test"
import { NavigationPage } from "./navigationPage"
import { OwnersPage } from "./ownersPage"
import { OwnerInformationPage } from "./ownerInformationPage"
import { PetDetailsPage } from "./petDetailsPage"
import { PetTypeEditPage } from "./petTypeEditPage"
import { PetTypesPage } from "./petTypesPage"
import { SpecialtiesPage } from "./specialtiesPage"
import { VeterinarianDetailsPage } from './veterinarianDetailsPage'
import { VeterinariansPage } from "./veterinariansPage"
import { VisitsPage } from "./visitsPage"

export class PageManager{

    private readonly navigationPage : NavigationPage
    private readonly ownersPage : OwnersPage
    private readonly ownerInformationPage : OwnerInformationPage
    private readonly petDetailsPage : PetDetailsPage
    private readonly petTypeEditPage : PetTypeEditPage
    private readonly petTypesPage : PetTypesPage
    private readonly specialtiesPage : SpecialtiesPage
    private readonly veterinarianDetailsPage : VeterinarianDetailsPage
    private readonly veterinariansPage : VeterinariansPage
    private readonly visitsPage : VisitsPage

    constructor(page: Page){
        this.navigationPage = new NavigationPage(page)
        this.ownersPage = new OwnersPage(page)
        this.ownerInformationPage = new OwnerInformationPage(page)
        this.petDetailsPage = new PetDetailsPage(page)
        this.petTypeEditPage = new PetTypeEditPage(page)
        this.petTypesPage = new PetTypesPage(page)
        this.specialtiesPage = new SpecialtiesPage(page)
        this.veterinarianDetailsPage = new VeterinarianDetailsPage(page)
        this.veterinariansPage = new VeterinariansPage(page)
        this.visitsPage = new VisitsPage(page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onOwnersPage(){
        return this.ownersPage
    }
    
    onOwnerInformationPage(){
        return this.ownerInformationPage
    }
    
    onPetDetailsPage(){
        return this.petDetailsPage
    }

    onPetTypeEditPage(){
        return this.petTypeEditPage
    }

    onPetTypesPage(){
        return this.petTypesPage
    }

    onSpecialtiesPage(){
        return this.specialtiesPage
    }

    onVeterinarianDetailsPage(){
        return this.veterinarianDetailsPage
    }
    
    onVeterinariansPage(){
        return this.veterinariansPage
    }

    onVisitsPage(){
        return this.visitsPage
    }


}