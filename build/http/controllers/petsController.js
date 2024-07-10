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
exports.PetsController = void 0;
const addPetsDTO_1 = require("../../src/application/dto/addPetsDTO");
const getPetsDTO_1 = require("../../src/application/dto/getPetsDTO");
const petsService_1 = require("../../src/application/petsService");
const tsoa_1 = require("tsoa");
const authMiddleware_1 = require("../routes/authMiddleware");
let PetsController = class PetsController extends tsoa_1.Controller {
    async getPets(success, error, query) {
        try {
            const getPetsDTO = getPetsDTO_1.GetPetsDTO.createDTO(query || "");
            const petService = new petsService_1.petsService();
            const httpResponse = await petService.getPets(getPetsDTO);
            success(200, httpResponse.body);
        }
        catch (err) {
            error(500, { status: "error", message: err.message });
        }
    }
    async addPets(body, success, error) {
        try {
            const addPetsDTO = addPetsDTO_1.AddPetsDTO.createDTO(body);
            const petService = new petsService_1.petsService();
            const response = await petService.addPets(addPetsDTO);
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
    (0, tsoa_1.Middlewares)(authMiddleware_1.authMiddleware),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, String]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "getPets", null);
__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addPetsDTO_1.AddPetsDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], PetsController.prototype, "addPets", null);
PetsController = __decorate([
    (0, tsoa_1.Route)("/petsapp/pet")
], PetsController);
exports.PetsController = PetsController;
