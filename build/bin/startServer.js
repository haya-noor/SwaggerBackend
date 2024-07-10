"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const petRoutes_1 = require("../http/routes/petRoutes");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../http/routes/routes");
const authMiddleware_1 = require("../http/routes/authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/petsapp/pet", petRoutes_1.petsRouter);
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/customersapp/customer', authMiddleware_1.authMiddleware);
(0, routes_1.RegisterRoutes)(app);
app.listen(3020, () => {
    console.log('Server is running on port 3020');
});
exports.default = app;
