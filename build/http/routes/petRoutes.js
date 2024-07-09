"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petsRouter = void 0;
const express_1 = __importDefault(require("express"));
const petsController_1 = require("../controllers/petsController");
exports.petsRouter = express_1.default.Router();
exports.petsRouter.get("/", async (req, res) => {
    const controller = new petsController_1.PetsController();
    const filter = req.query['filter'];
    controller.getPets((status, data) => res.status(status).json(data), (status, error) => res.status(status).json(error), filter);
});
exports.petsRouter.post("/", async (req, res) => {
    const controller = new petsController_1.PetsController();
    controller.addPets(req.body, (status, data) => res.status(status).json(data), (status, error) => res.status(status).json(error));
});
