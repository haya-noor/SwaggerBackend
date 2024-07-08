"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petsService = void 0;
const petEntitiy_1 = require("../domain/petEntitiy");
const petsData_1 = require("../infrastructure/petsData");
const httpResponse_1 = __importDefault(require("./utils/httpResponse"));
class petsService {
    getPets(getPetsDto) {
        const petEntities = [];
        for (const pet of petsData_1.placeHolderPets) {
            if (getPetsDto.name && getPetsDto.name !== pet.name)
                continue;
            if (getPetsDto.species && getPetsDto.species !== pet.species)
                continue;
            petEntities.push(petEntitiy_1.PetEntity.createPet(pet));
        }
        if (petEntities.length > 0)
            return httpResponse_1.default.ok(petEntities);
        return httpResponse_1.default.notFound();
    }
    addPets(addPetsDto) {
        const petEntity = petEntitiy_1.PetEntity.createPet(addPetsDto);
        if (petEntity.petId) {
            return httpResponse_1.default.ok(petEntity);
        }
        return httpResponse_1.default.error({
            message: "error creating pet"
        });
    }
}
exports.petsService = petsService;
