"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../src/authentication");
const payload = {
    id: 1,
    name: 'John Doe'
};
const token = (0, authentication_1.generateToken)(payload);
console.log(`Generated Token: ${token}`);
