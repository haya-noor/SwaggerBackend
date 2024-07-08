"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfICustomer = instanceOfICustomer;
exports.ICustomerFromJSON = ICustomerFromJSON;
exports.ICustomerFromJSONTyped = ICustomerFromJSONTyped;
exports.ICustomerToJSON = ICustomerToJSON;
function instanceOfICustomer(value) {
    if (!('firstName' in value) || value['firstName'] === undefined)
        return false;
    if (!('lastName' in value) || value['lastName'] === undefined)
        return false;
    if (!('customerId' in value) || value['customerId'] === undefined)
        return false;
    return true;
}
function ICustomerFromJSON(json) {
    return ICustomerFromJSONTyped(json, false);
}
function ICustomerFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'customerId': json['customerId'],
    };
}
function ICustomerToJSON(value) {
    if (value == null) {
        return value;
    }
    return {
        'firstName': value['firstName'],
        'lastName': value['lastName'],
        'customerId': value['customerId'],
    };
}
