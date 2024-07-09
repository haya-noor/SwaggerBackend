"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomerDTO = void 0;
class AddCustomerDTO {
    constructor(dto) {
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
    }
    static createDTO(dto) {
        return new AddCustomerDTO(dto);
    }
}
exports.AddCustomerDTO = AddCustomerDTO;
