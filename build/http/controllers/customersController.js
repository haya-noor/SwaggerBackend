"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const addCustomerDTO_1 = require("../../src/application/dto/addCustomerDTO");
const getCustomerDTO_1 = require("../../src/application/dto/getCustomerDTO");
const customersService_1 = require("../../src/application/customersService");
const tsoa_1 = require("tsoa");
let CustomerController = class CustomerController extends tsoa_1.Controller {
    async getCustomers(success, error, query) {
        try {
            const getCustomersDTO = getCustomerDTO_1.GetCustomersDTO.createDTO(query || "");
            const customerService = new customersService_1.customersService();
            const httpResponse = await customerService.getCustomers(getCustomersDTO);
            success(200, httpResponse.body);
        }
        catch (err) {
            error(500, { status: "error", message: err.message });
        }
    }
    async addCustomer(body, success, error) {
        try {
            const addCustomerDTO = addCustomerDTO_1.AddCustomerDTO.createDTO(body);
            const customerService = new customersService_1.customersService();
            const response = await customerService.addCustomer(addCustomerDTO);
            success(200, response.body);
        }
        catch (err) {
            error(500, { status: "error", message: err.message });
        }
    }
};
__decorate([
    (0, tsoa_1.SuccessResponse)("200", "Found"),
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "getCustomers", null);
__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addCustomerDTO_1.AddCustomerDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], CustomerController.prototype, "addCustomer", null);
CustomerController = __decorate([
    (0, tsoa_1.Route)("/customersapp/customer")
], CustomerController);
exports.CustomerController = CustomerController;
