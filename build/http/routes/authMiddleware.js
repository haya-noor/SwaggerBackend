"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authentication_1 = require("../../src/authentication");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized: No token provided.' });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided.' });
        return;
    }
    try {
        const decoded = (0, authentication_1.verifyToken)(token);
        if (!decoded) {
            res.status(401).json({ message: 'Unauthorized: Failed to authenticate token.' });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Unauthorized: Failed to authenticate token.' });
        return;
    }
};
exports.authMiddleware = authMiddleware;
