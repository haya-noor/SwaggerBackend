"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEntity = void 0;
class CustomerEntity {
    constructor(customer) {
        this.firstName = customer.firstName;
        this.lastName = customer.lastName;
        this.customerId = customer.customerId;
    }
    static createCustomer(customer) {
        return new CustomerEntity(customer);
    }
}
exports.CustomerEntity = CustomerEntity;
