import { Page } from "@playwright/test"
import { AddPetPage } from "./addPetPage"
import { EditPetPage } from "./editPetPage"
import { NavigationPage } from "./navigationPage"
import { OwnersPage } from "./ownersPage"
import { OwnerInformationPage } from "./ownerInformationPage"
import { PetTypeEditPage } from "./petTypeEditPage"
import { PetTypesPage } from "./petTypesPage"
import { SpecialtiesPage } from "./specialtiesPage"
import { EditVeterinarianPage } from "./editVeterinarianPage"
import { VeterinariansPage } from "./veterinariansPage"
import { NewVisitPage } from "./newVisitPage"
import { EditSpecialtyPage } from "./editSpecialtyPage"
import { NewOwnerPage } from "./newOwnerPage"

export class PageManager{

    private readonly addPetPage : AddPetPage
    private readonly editPetPage : EditPetPage
    private readonly editSpecialtyPage: EditSpecialtyPage
    private readonly editVeterinarianPage : EditVeterinarianPage
    private readonly navigationPage : NavigationPage
    private readonly newOwnerPage: NewOwnerPage
    private readonly newVisitPage : NewVisitPage
    private readonly ownersPage : OwnersPage
    private readonly ownerInformationPage : OwnerInformationPage
    private readonly petTypeEditPage : PetTypeEditPage
    private readonly petTypesPage : PetTypesPage
    private readonly specialtiesPage : SpecialtiesPage
    private readonly veterinariansPage : VeterinariansPage

    constructor(page: Page){
        this.addPetPage = new AddPetPage(page)
        this.editPetPage = new EditPetPage(page)
        this.editSpecialtyPage = new EditSpecialtyPage(page)
        this.editVeterinarianPage = new EditVeterinarianPage(page)
        this.navigationPage = new NavigationPage(page)
        this.newOwnerPage = new NewOwnerPage(page)
        this.newVisitPage = new NewVisitPage(page)
        this.newOwnerPage = new NewOwnerPage(page)
        this.ownersPage = new OwnersPage(page)
        this.ownerInformationPage = new OwnerInformationPage(page)
        this.petTypeEditPage = new PetTypeEditPage(page)
        this.petTypesPage = new PetTypesPage(page)
        this.specialtiesPage = new SpecialtiesPage(page)
        this.veterinariansPage = new VeterinariansPage(page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onAddPetPage(){
        return this.addPetPage
    }

    onEditPetPage(){
        return this.editPetPage
    }

    onEditSpecialtyPage(){
        return this.editSpecialtyPage
    }

    onEditVeterinarianPage(){
        return this.editVeterinarianPage
    }

    onNewOwnerPage(){
        return this.newOwnerPage
    }

    onNewVisitPage(){
        return this.newVisitPage
    }

    onOwnersPage(){
        return this.ownersPage
    }
    
    onOwnerInformationPage(){
        return this.ownerInformationPage
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
    
    onVeterinariansPage(){
        return this.veterinariansPage
    }
}