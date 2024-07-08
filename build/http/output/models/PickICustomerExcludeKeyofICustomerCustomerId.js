"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfPickICustomerExcludeKeyofICustomerCustomerId = instanceOfPickICustomerExcludeKeyofICustomerCustomerId;
exports.PickICustomerExcludeKeyofICustomerCustomerIdFromJSON = PickICustomerExcludeKeyofICustomerCustomerIdFromJSON;
exports.PickICustomerExcludeKeyofICustomerCustomerIdFromJSONTyped = PickICustomerExcludeKeyofICustomerCustomerIdFromJSONTyped;
exports.PickICustomerExcludeKeyofICustomerCustomerIdToJSON = PickICustomerExcludeKeyofICustomerCustomerIdToJSON;
function instanceOfPickICustomerExcludeKeyofICustomerCustomerId(value) {
    if (!('firstName' in value) || value['firstName'] === undefined)
        return false;
    if (!('lastName' in value) || value['lastName'] === undefined)
        return false;
    return true;
}
function PickICustomerExcludeKeyofICustomerCustomerIdFromJSON(json) {
    return PickICustomerExcludeKeyofICustomerCustomerIdFromJSONTyped(json, false);
}
function PickICustomerExcludeKeyofICustomerCustomerIdFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'firstName': json['firstName'],
        'lastName': json['lastName'],
    };
}
function PickICustomerExcludeKeyofICustomerCustomerIdToJSON(value) {
    if (value == null) {
        return value;
    }
    return {
        'firstName': value['firstName'],
        'lastName': value['lastName'],
    };
}
