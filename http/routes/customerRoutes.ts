
import express from 'express';
import { CustomerController } from '../controllers/customersController';
import { authMiddleware } from '../../http/routes/authMiddleware';

export const customerRouter = express.Router();

// Apply the middleware to all routes in this router
customerRouter.use(authMiddleware);

customerRouter.get("/", async (req, res) => {
  const controller = new CustomerController();
  const filter = req.query['filter'] as string;

  controller.getCustomers(
    (status, data) => res.status(status).json(data),
    (status, error) => res.status(status).json(error),
    filter
  );
});

customerRouter.post("/", async (req, res) => {
  const controller = new CustomerController();

  controller.addCustomer(
    req.body,
    (status, data) => res.status(status).json(data),
    (status, error) => res.status(status).json(error)
  );
});
