class Database {
    constructor() {
        this.items = new Map();
        this.nextId = 1;
    }

    create(item) {
        const id = this.nextId++;
        const newItem = { id, ...item, createdAt: new Date() };
        this.items.set(id, newItem);
        return newItem;
    }

    getAll() {
        return Array.from(this.items.values());
    }

    getById(id) {
        return this.items.get(Number(id));
    }

    update(id, item) {
        id = Number(id);
        if (!this.items.has(id)) {
            return null;
        }
        const updatedItem = { ...this.items.get(id), ...item, updatedAt: new Date() };
        this.items.set(id, updatedItem);
        return updatedItem;
    }

    delete(id) {
        id = Number(id);
        if (!this.items.has(id)) {
            return false;
        }
        return this.items.delete(id);
    }
}

module.exports = new Database();
