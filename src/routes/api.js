const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const itemsController = require('../controllers/items');

// Public routes
router.get('/items', itemsController.getAllItems);
router.get('/items/:id', itemsController.getItem);

// Protected routes
router.post('/items', [authMiddleware, validate], itemsController.createItem);
router.put('/items/:id', [authMiddleware, validate], itemsController.updateItem);
router.delete('/items/:id', authMiddleware, itemsController.deleteItem);

module.exports = router;
