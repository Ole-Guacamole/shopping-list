"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db"); // Import the existing Prisma client
const router = (0, express_1.Router)();
// Create a new item
router.post('/items', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, quantity, shoppingListId } = req.body;
    try {
        const newItem = yield db_1.prisma.item.create({
            data: {
                name,
                quantity,
                shoppingListId,
            },
        });
        res.status(201).json(newItem);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Get all items
router.get('/items', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield db_1.prisma.item.findMany();
        res.status(200).json(items);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Get a single item by ID
router.get('/items/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const item = yield db_1.prisma.item.findUnique({
            where: { id },
        });
        if (item) {
            res.status(200).json(item);
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Update an item by ID
router.put('/items/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, quantity } = req.body;
    try {
        const updatedItem = yield db_1.prisma.item.update({
            where: { id },
            data: { name, quantity },
        });
        res.status(200).json(updatedItem);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
exports.default = router;
