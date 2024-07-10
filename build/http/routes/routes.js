"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
const runtime_1 = require("@tsoa/runtime");
const petsController_1 = require("./../controllers/petsController");
const customersController_1 = require("./../controllers/customersController");
const models = {
    "IPet": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "age": { "dataType": "double", "required": true },
            "species": { "dataType": "string", "required": true },
            "customerId": { "dataType": "string", "required": true },
            "petId": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "Pick_IPet.Exclude_keyofIPet.petId-or-customerId__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "name": { "dataType": "string", "required": true }, "age": { "dataType": "double", "required": true }, "species": { "dataType": "string", "required": true } }, "validators": {} },
    },
    "AddPetsDTO": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "age": { "dataType": "double", "required": true },
            "species": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "ICustomer": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "customerId": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "Pick_ICustomer.Exclude_keyofICustomer.customerId__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "firstName": { "dataType": "string", "required": true }, "lastName": { "dataType": "string", "required": true } }, "validators": {} },
    },
    "AddCustomerDTO": {
        "dataType": "refObject",
        "properties": {
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "silently-remove-extras", "bodyCoercion": true });
function RegisterRoutes(app) {
    app.get('/petsapp/pet', ...((0, runtime_1.fetchMiddlewares)(petsController_1.PetsController)), ...((0, runtime_1.fetchMiddlewares)(petsController_1.PetsController.prototype.getPets)), async function PetsController_getPets(request, response, next) {
        const args = {
            success: { "in": "res", "name": "200", "required": true, "dataType": "array", "array": { "dataType": "refObject", "ref": "IPet" } },
            error: { "in": "res", "name": "500", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "string", "required": true } } },
            query: { "in": "query", "name": "query", "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new petsController_1.PetsController();
            await templateService.apiHandler({
                methodName: 'getPets',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/petsapp/pet', ...((0, runtime_1.fetchMiddlewares)(petsController_1.PetsController)), ...((0, runtime_1.fetchMiddlewares)(petsController_1.PetsController.prototype.addPets)), async function PetsController_addPets(request, response, next) {
        const args = {
            body: { "in": "body", "name": "body", "required": true, "ref": "AddPetsDTO" },
            success: { "in": "res", "name": "200", "required": true, "ref": "IPet" },
            error: { "in": "res", "name": "500", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "string", "required": true } } },
        };
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new petsController_1.PetsController();
            await templateService.apiHandler({
                methodName: 'addPets',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    app.get('/customersapp/customer', ...((0, runtime_1.fetchMiddlewares)(customersController_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(customersController_1.CustomerController.prototype.getCustomers)), async function CustomerController_getCustomers(request, response, next) {
        const args = {
            success: { "in": "res", "name": "200", "required": true, "dataType": "array", "array": { "dataType": "refObject", "ref": "ICustomer" } },
            error: { "in": "res", "name": "500", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "string", "required": true } } },
            query: { "in": "query", "name": "query", "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new customersController_1.CustomerController();
            await templateService.apiHandler({
                methodName: 'getCustomers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
            });
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/customersapp/customer', ...((0, runtime_1.fetchMiddlewares)(customersController_1.CustomerController)), ...((0, runtime_1.fetchMiddlewares)(customersController_1.CustomerController.prototype.addCustomer)), async function CustomerController_addCustomer(request, response, next) {
        const args = {
            body: { "in": "body", "name": "body", "required": true, "ref": "AddCustomerDTO" },
            success: { "in": "res", "name": "200", "required": true, "ref": "ICustomer" },
            error: { "in": "res", "name": "500", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "string", "required": true } } },
        };
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args, request, response });
            const controller = new customersController_1.CustomerController();
            await templateService.apiHandler({
                methodName: 'addCustomer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
            });
        }
        catch (err) {
            return next(err);
        }
    });
}
exports.RegisterRoutes = RegisterRoutes;
