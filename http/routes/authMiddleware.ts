

import { Request, Response, NextFunction } from 'express';

const hardcodedToken = 'hij';  // Hardcoded token

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
    // Token is valid, proceed to the next middleware or route handler
    next();
};
