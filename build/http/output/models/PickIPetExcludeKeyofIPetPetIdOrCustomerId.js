"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfPickIPetExcludeKeyofIPetPetIdOrCustomerId = instanceOfPickIPetExcludeKeyofIPetPetIdOrCustomerId;
exports.PickIPetExcludeKeyofIPetPetIdOrCustomerIdFromJSON = PickIPetExcludeKeyofIPetPetIdOrCustomerIdFromJSON;
exports.PickIPetExcludeKeyofIPetPetIdOrCustomerIdFromJSONTyped = PickIPetExcludeKeyofIPetPetIdOrCustomerIdFromJSONTyped;
exports.PickIPetExcludeKeyofIPetPetIdOrCustomerIdToJSON = PickIPetExcludeKeyofIPetPetIdOrCustomerIdToJSON;
function instanceOfPickIPetExcludeKeyofIPetPetIdOrCustomerId(value) {
    if (!('name' in value) || value['name'] === undefined)
        return false;
    if (!('age' in value) || value['age'] === undefined)
        return false;
    if (!('species' in value) || value['species'] === undefined)
        return false;
    return true;
}
function PickIPetExcludeKeyofIPetPetIdOrCustomerIdFromJSON(json) {
    return PickIPetExcludeKeyofIPetPetIdOrCustomerIdFromJSONTyped(json, false);
}
function PickIPetExcludeKeyofIPetPetIdOrCustomerIdFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'name': json['name'],
        'age': json['age'],
        'species': json['species'],
    };
}
function PickIPetExcludeKeyofIPetPetIdOrCustomerIdToJSON(value) {
    if (value == null) {
        return value;
    }
    return {
        'name': value['name'],
        'age': value['age'],
        'species': value['species'],
    };
}
