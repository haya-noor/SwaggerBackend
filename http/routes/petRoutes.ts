


/*
import express from 'express';
import { PetsController } from '../controllers/petsController';
//import { authMiddleware } from './authMiddleware';
//import { authMiddleware } from '../routes/authMiddleware';

export const petsRouter = express.Router();

petsRouter.get("/", async (req, res) => {
  const controller = new PetsController();
  const filter = req.query['filter'] as string;

  controller.getPets(
    (status, data) => res.status(status).json(data),
    (status, error) => res.status(status).json(error),
    filter
  );
});

petsRouter.post("/", async (req, res) => {
  const controller = new PetsController();

  controller.addPets(
    req.body,
    (status, data) => res.status(status).json(data),
    (status, error) => res.status(status).json(error)
  );
});
*/

import express from 'express';
import { PetsController } from '../controllers/petsController';
import { authMiddleware } from './authMiddleware'; // Adjust the import path as needed

export const petsRouter = express.Router();

// Apply the middleware to all routes
petsRouter.use(authMiddleware);

petsRouter.get("/", async (req, res) => {
  const controller = new PetsController();
  const filter = req.query['filter'] as string;

  controller.getPets(
    (status, data) => res.status(status).json(data),
    (status, error) => res.status(status).json(error),
    filter
  );
});

petsRouter.post("/", async (req, res) => {
  const controller = new PetsController();

  controller.addPets(
    req.body,
    (status, data) => res.status(status).json(data),
    (status, error) => res.status(status).json(error)
  );
});
