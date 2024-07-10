"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const hardcodedToken = 'hij';
const authMiddleware = (req, res, next) => {
    console.log('Executing authMiddleware');
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('No auth header');
        res.status(401).json({ message: 'Unauthorized: No token provided.' });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token || token !== hardcodedToken) {
        console.log('Invalid token');
        res.status(401).json({ message: 'Unauthorized: Invalid or missing token.' });
        return;
    }
    console.log('Token valid');
    next();
};
exports.authMiddleware = authMiddleware;
