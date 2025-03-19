import express from 'express';
import employeeController from './controllers/employeeController.js'; 

const router = express.Router();

router.use('/employees', employeeController);

export default router;

