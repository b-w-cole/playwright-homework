import { faker } from "@faker-js/faker";

export class RandomDataHelper{
    
    getFirstName(): string{
        return faker.person.firstName()
    }

    getLastName(): string{
        return faker.person.lastName()
    }

    getPetName(): string{
        return faker.animal.petName()
    }

    getPetType(): string{
        return faker.animal.type()
    }

    getPetBirthdate(): Date{
        return faker.date.recent()
    }

    getAddress(): string{
        return faker.location.streetAddress()
    }

    getCity(): string{
        return faker.location.city()
    }

    getPhone(): string{
        return faker.number.int({min: 1000000000, max: 9999999999}).toString()
    }

    getVisitDescription(): string{
        return faker.lorem.sentence()
    }

    getPresetPetType(){
        const number = faker.number.int({min: 1, max: 6})
        switch(number){
            case 1:
                return 'cat'
            case 2:
                return 'dog'
            case 3:
                return 'lizard'
            case 4:
                return 'bird'
            case 5:
                return 'snake'
            case 6: 
                return 'hamster'
            default:
                return ''
        }
    }
}