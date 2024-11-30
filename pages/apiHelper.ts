import { Page, APIRequestContext, expect } from "@playwright/test";

export class APIHelper{
    readonly request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    /* OWNER API CALLS */
    async getOwnerIDFromOwnerCreationResponse(page: Page): Promise<string>{
        const response = await page.waitForResponse('https://petclinic-api.bondaracademy.com/petclinic/api/owners*')
        return (await response.json()).id
    }

    async deleteOwner(ownerID: string){
        const response = await this.request.delete(`https://petclinic-api.bondaracademy.com/petclinic/api/owners/${ownerID}`)
        expect(response.status()).toEqual(204)
    }

    /* VETERINARIAN API CALLS */
    async createNewVeteranarianAndGetID(firstName: string, lastName: string, specialties: {}[]){

        const veterinarianCreationResponse = await this.request.post('https://petclinic-api.bondaracademy.com/petclinic/api/vets',{
            data: {
                'id': null,
                'firstName': firstName,
                'lastName': lastName,
                'specialties': specialties
            }
        })
        expect(veterinarianCreationResponse.status()).toEqual(201)

        return (await veterinarianCreationResponse.json()).id
    }

    async deleteVeterinarian(vetID: string){
        const deleteResponse = await this.request.delete(`https://petclinic-api.bondaracademy.com/petclinic/api/vets/${vetID}`)
        expect(deleteResponse.status()).toEqual(204)
    }

    async validateVeterinarianDoesNotExist(veterinarianID: string){
        const getVeterinariansResponse = await this.request.get('https://petclinic-api.bondaracademy.com/petclinic/api/vets')
        const responseBody = await getVeterinariansResponse.json()
        const veterinarians = await responseBody.map(vet => vet.id)

        expect(veterinarians).not.toContainEqual(veterinarianID)
        
    }

    /* SPECIALTY API CALLS */
    async createSpecialtyAndGetID(specialtyName: string): Promise<string>{
        const response = await this.request.post('https://petclinic-api.bondaracademy.com/petclinic/api/specialties', {
            data: {
                name: specialtyName
            }
        })
        expect(response.status()).toEqual(201)

        return (await response.json()).id
    }

    async deleteSpecialty(specialtyID: string){
        const deleteSpecialtyResponse = await this.request.delete(`https://petclinic-api.bondaracademy.com/petclinic/api/specialties/${specialtyID}`)
        expect(deleteSpecialtyResponse.status()).toEqual(204)
    }

    async getSpecialtyJSON(specialtyName: string){
        const response = await this.request.fetch('https://petclinic-api.bondaracademy.com/petclinic/api/specialties')
        const responseBody = await response.json()
        return responseBody.find(specialty => specialty.name === specialtyName)
    }
}