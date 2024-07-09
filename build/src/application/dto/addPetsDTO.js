"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPetsDTO = void 0;
class AddPetsDTO {
    constructor(dto) {
        this.name = dto.name;
        this.species = dto.species;
        this.age = dto.age;
    }
    static createDTO(dto) {
        return new AddPetsDTO(dto);
    }
}
exports.AddPetsDTO = AddPetsDTO;
