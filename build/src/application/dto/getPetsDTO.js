"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPetsDTO = void 0;
class GetPetsDTO {
    name;
    species;
    customerId;
    constructor(dto) {
        this.name = dto.name;
        this.species = dto.species;
        this.customerId = dto.customerId;
    }
    static createDTO(dto) {
        return new GetPetsDTO(dto);
    }
}
exports.GetPetsDTO = GetPetsDTO;
