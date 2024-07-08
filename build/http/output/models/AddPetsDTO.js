"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfAddPetsDTO = instanceOfAddPetsDTO;
exports.AddPetsDTOFromJSON = AddPetsDTOFromJSON;
exports.AddPetsDTOFromJSONTyped = AddPetsDTOFromJSONTyped;
exports.AddPetsDTOToJSON = AddPetsDTOToJSON;
function instanceOfAddPetsDTO(value) {
    if (!('name' in value) || value['name'] === undefined)
        return false;
    if (!('age' in value) || value['age'] === undefined)
        return false;
    if (!('species' in value) || value['species'] === undefined)
        return false;
    return true;
}
function AddPetsDTOFromJSON(json) {
    return AddPetsDTOFromJSONTyped(json, false);
}
function AddPetsDTOFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'name': json['name'],
        'age': json['age'],
        'species': json['species'],
    };
}
function AddPetsDTOToJSON(value) {
    if (value == null) {
        return value;
    }
    return {
        'name': value['name'],
        'age': value['age'],
        'species': value['species'],
    };
}
