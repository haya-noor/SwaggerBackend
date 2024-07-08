"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultApi = void 0;
const runtime = __importStar(require("../runtime"));
const index_1 = require("../models/index");
class DefaultApi extends runtime.BaseAPI {
    async addCustomerRaw(requestParameters, initOverrides) {
        if (requestParameters['addCustomerDTO'] == null) {
            throw new runtime.RequiredError('addCustomerDTO', 'Required parameter "addCustomerDTO" was null or undefined when calling addCustomer().');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        const response = await this.request({
            path: `/customersapp/customer`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: (0, index_1.AddCustomerDTOToJSON)(requestParameters['addCustomerDTO']),
        }, initOverrides);
        return new runtime.JSONApiResponse(response, (jsonValue) => (0, index_1.ICustomerFromJSON)(jsonValue));
    }
    async addCustomer(requestParameters, initOverrides) {
        const response = await this.addCustomerRaw(requestParameters, initOverrides);
        switch (response.raw.status) {
            case 200:
                return await response.value();
            case 201:
                return null;
            default:
                return await response.value();
        }
    }
    async addPetsRaw(requestParameters, initOverrides) {
        if (requestParameters['addPetsDTO'] == null) {
            throw new runtime.RequiredError('addPetsDTO', 'Required parameter "addPetsDTO" was null or undefined when calling addPets().');
        }
        const queryParameters = {};
        const headerParameters = {};
        headerParameters['Content-Type'] = 'application/json';
        const response = await this.request({
            path: `/petsapp/pet`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: (0, index_1.AddPetsDTOToJSON)(requestParameters['addPetsDTO']),
        }, initOverrides);
        return new runtime.JSONApiResponse(response, (jsonValue) => (0, index_1.IPetFromJSON)(jsonValue));
    }
    async addPets(requestParameters, initOverrides) {
        const response = await this.addPetsRaw(requestParameters, initOverrides);
        switch (response.raw.status) {
            case 200:
                return await response.value();
            case 201:
                return null;
            default:
                return await response.value();
        }
    }
    async getCustomersRaw(requestParameters, initOverrides) {
        const queryParameters = {};
        if (requestParameters['query'] != null) {
            queryParameters['query'] = requestParameters['query'];
        }
        const headerParameters = {};
        const response = await this.request({
            path: `/customersapp/customer`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(index_1.ICustomerFromJSON));
    }
    async getCustomers(requestParameters = {}, initOverrides) {
        const response = await this.getCustomersRaw(requestParameters, initOverrides);
        return await response.value();
    }
    async getPetsRaw(requestParameters, initOverrides) {
        const queryParameters = {};
        if (requestParameters['query'] != null) {
            queryParameters['query'] = requestParameters['query'];
        }
        const headerParameters = {};
        const response = await this.request({
            path: `/petsapp/pet`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);
        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(index_1.IPetFromJSON));
    }
    async getPets(requestParameters = {}, initOverrides) {
        const response = await this.getPetsRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
exports.DefaultApi = DefaultApi;
