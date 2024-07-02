
/*
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = '777';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }
        // Save the decoded information to the request for use in other routes
        req.user = decoded;
        next();
    });
};
*/



/*
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../src/authentication';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized: Failed to authenticate token.' });
    }

    // Save the decoded information to the request for use in other routes
    (req as any).user = decoded;
    next();
};
*/
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
