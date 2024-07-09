"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetEntity = void 0;
class PetEntity {
    constructor(pet) {
        this.age = pet.age;
        this.customerId = pet.customerId;
        this.species = pet.species;
        this.name = pet.name;
        this.petId = pet.petId;
    }
    static createPet(pet) {
        return new PetEntity(pet);
    }
}
exports.PetEntity = PetEntity;
