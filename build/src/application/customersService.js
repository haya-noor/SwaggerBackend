"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customersService = void 0;
const customerEntity_1 = require("../domain/customerEntity");
const customersData_1 = require("../../src/infrastructure/customersData");
const httpResponse_1 = __importDefault(require("./utils/httpResponse"));
class customersService {
    getCustomers(getCustomersDto) {
        const customerEntities = [];
        for (const customer of customersData_1.placeHolderCustomers) {
            if (getCustomersDto.customerId && getCustomersDto.customerId !== customer.customerId)
                continue;
            if (getCustomersDto.firstName && getCustomersDto.firstName !== customer.firstName)
                continue;
            if (getCustomersDto.lastName && getCustomersDto.lastName !== customer.lastName)
                continue;
            customerEntities.push(customerEntity_1.CustomerEntity.createCustomer(customer));
        }
        if (customerEntities.length > 0)
            return httpResponse_1.default.ok(customerEntities);
        return httpResponse_1.default.notFound();
    }
    addCustomer(addCustomerDto) {
        const customerEntity = customerEntity_1.CustomerEntity.createCustomer(addCustomerDto);
        if (customerEntity.customerId) {
            return httpResponse_1.default.ok(customerEntity);
        }
        return httpResponse_1.default.error({
            message: "error creating customer"
        });
    }
}
exports.customersService = customersService;
