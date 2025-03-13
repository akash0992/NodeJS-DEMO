const database = require('../services/database');
const logger = require('../services/logger');

exports.getAllItems = (req, res) => {
    try {
        const items = database.getAll();
        res.json(items);
    } catch (error) {
        logger.error('Error getting items:', error);
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
};

exports.getItem = (req, res) => {
    try {
        const item = database.getById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        logger.error('Error getting item:', error);
        res.status(500).json({ error: 'Failed to retrieve item' });
    }
};

exports.createItem = (req, res) => {
    try {
        const item = database.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        logger.error('Error creating item:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
};

exports.updateItem = (req, res) => {
    try {
        const item = database.update(req.params.id, req.body);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        logger.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
};

exports.deleteItem = (req, res) => {
    try {
        const deleted = database.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(204).send();
    } catch (error) {
        logger.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
};
