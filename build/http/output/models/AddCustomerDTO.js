"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfAddCustomerDTO = instanceOfAddCustomerDTO;
exports.AddCustomerDTOFromJSON = AddCustomerDTOFromJSON;
exports.AddCustomerDTOFromJSONTyped = AddCustomerDTOFromJSONTyped;
exports.AddCustomerDTOToJSON = AddCustomerDTOToJSON;
function instanceOfAddCustomerDTO(value) {
    if (!('firstName' in value) || value['firstName'] === undefined)
        return false;
    if (!('lastName' in value) || value['lastName'] === undefined)
        return false;
    return true;
}
function AddCustomerDTOFromJSON(json) {
    return AddCustomerDTOFromJSONTyped(json, false);
}
function AddCustomerDTOFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'firstName': json['firstName'],
        'lastName': json['lastName'],
    };
}
function AddCustomerDTOToJSON(value) {
    if (value == null) {
        return value;
    }
    return {
        'firstName': value['firstName'],
        'lastName': value['lastName'],
    };
}
