/*
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../src/authentication';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
        const decoded = verifyToken(token);
        if (!decoded) {
            res.status(401).json({ message: 'Unauthorized: Failed to authenticate token.' });
            return;
        }

        // Save the decoded information to the request for use in other routes
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Failed to authenticate token.' });
        return;
    }
};
*/


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
