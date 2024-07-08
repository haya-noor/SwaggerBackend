"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfGetPets500Response = instanceOfGetPets500Response;
exports.GetPets500ResponseFromJSON = GetPets500ResponseFromJSON;
exports.GetPets500ResponseFromJSONTyped = GetPets500ResponseFromJSONTyped;
exports.GetPets500ResponseToJSON = GetPets500ResponseToJSON;
function instanceOfGetPets500Response(value) {
    if (!('message' in value) || value['message'] === undefined)
        return false;
    if (!('status' in value) || value['status'] === undefined)
        return false;
    return true;
}
function GetPets500ResponseFromJSON(json) {
    return GetPets500ResponseFromJSONTyped(json, false);
}
function GetPets500ResponseFromJSONTyped(json, ignoreDiscriminator) {
    if (json == null) {
        return json;
    }
    return {
        'message': json['message'],
        'status': json['status'],
    };
}
function GetPets500ResponseToJSON(value) {
    if (value == null) {
        return value;
    }
    return {
        'message': value['message'],
        'status': value['status'],
    };
}
