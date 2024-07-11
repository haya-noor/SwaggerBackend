"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRouter = void 0;
const express_1 = __importDefault(require("express"));
const customersController_1 = require("../controllers/customersController");
const authMiddleware_1 = require("../../http/routes/authMiddleware");
exports.customerRouter = express_1.default.Router();
exports.customerRouter.use(authMiddleware_1.authMiddleware);
exports.customerRouter.get("/", async (req, res) => {
    const controller = new customersController_1.CustomerController();
    const filter = req.query['filter'];
    controller.getCustomers((status, data) => res.status(status).json(data), (status, error) => res.status(status).json(error), filter);
});
exports.customerRouter.post("/", async (req, res) => {
    const controller = new customersController_1.CustomerController();
    controller.addCustomer(req.body, (status, data) => res.status(status).json(data), (status, error) => res.status(status).json(error));
});
