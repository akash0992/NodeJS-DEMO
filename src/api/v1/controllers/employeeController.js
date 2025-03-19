import express from 'express';
import { getAllEmployees, saveEmployee, updateEmployee, deleteEmployee } from '../services/employeeService.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await getAllEmployees();
        if (!response.success) {
            throw response.err;
        }
        res.status(200).send({data: response.data});
    } catch (err) {
        res.status(400).send({message: err.message});
    }
});

router.post('/save', async (req, res) => {
    try {
        const response = await saveEmployee(req.body);
        if (!response.success) {
            throw response.err;
        }
        res.status(200).send({message: response.message});
    } catch (err) {
        res.status(400).send({message: err.message});
    }
});

router.put('/edit', async (req, res) => {
    try {
        const response = await updateEmployee(req.body);
        if (!response.success) {
            throw response.err;
        }
        res.status(200).send({message: response.message});
    } catch (err) {
        res.status(400).send({message: err.message});
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const response = await deleteEmployee(req.query.id);
        if (!response.success) {
            throw response.err;
        }
        res.status(200).send({message: response.message});
    } catch (err) {
        res.status(400).send({message: err.message});
    }
});
export default router;