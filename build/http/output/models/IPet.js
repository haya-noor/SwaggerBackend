"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfIPet = instanceOfIPet;
exports.IPetFromJSON = IPetFromJSON;
exports.IPetFromJSONTyped = IPetFromJSONTyped;
exports.IPetToJSON = IPetToJSON;
function instanceOfIPet(value) {
    if (!('name' in value) || value['name'] === undefined)
        return false;
    if (!('age' in value) || value['age'] === undefined)
        return false;
    if (!('species' in value) || value['species'] === undefined)
        return false;
    if (!('customerId' in value) || value['customerId'] === undefined)
        return false;
    if (!('petId' in value) || value['petId'] === undefined)
        return false;
    return true;
}
function IPetFromJSON(json) {
    return IPetFromJSONTyped(json, false);
}
function IPetFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'name': json['name'],
        'age': json['age'],
        'species': json['species'],
        'customerId': json['customerId'],
        'petId': json['petId'],
    };
}
function IPetToJSON(value) {
    if (value == null) {
        return value;
    }
    return {
        'name': value['name'],
        'age': value['age'],
        'species': value['species'],
        'customerId': value['customerId'],
        'petId': value['petId'],
    };
}
