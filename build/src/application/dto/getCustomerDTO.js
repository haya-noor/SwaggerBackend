"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCustomersDTO = void 0;
class GetCustomersDTO {
    customerId;
    firstName;
    lastName;
    constructor(dto) {
        this.customerId = dto.customerId;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
    }
    static createDTO(dto) {
        return new GetCustomersDTO(dto);
    }
}
exports.GetCustomersDTO = GetCustomersDTO;
