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
const db_1 = require("../db");
const router = (0, express_1.Router)();
// Create a new shopping list
router.post('/shopping-lists', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerId } = req.body;
    try {
        const shoppingList = yield db_1.prisma.shoppingList.create({
            data: {
                name,
                ownerId,
            },
        });
        res.status(201).json(shoppingList);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Get all shopping lists for a user
router.get('/users/:userId/shopping-lists', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const shoppingLists = yield db_1.prisma.shoppingList.findMany({
            where: { ownerId: userId },
            include: { items: true, users: true },
        });
        res.status(200).json(shoppingLists);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Add a user to a shopping list
router.post('/shopping-lists/:listId/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.params;
    const { userId } = req.body;
    try {
        const userShoppingList = yield db_1.prisma.userShoppingList.create({
            data: {
                userId,
                shoppingListId: listId,
            },
        });
        res.status(201).json(userShoppingList);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Edit a shopping list
router.put('/shopping-lists/:listId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.params;
    const { name } = req.body;
    try {
        const shoppingList = yield db_1.prisma.shoppingList.update({
            where: { id: listId },
            data: { name },
        });
        res.status(200).json(shoppingList);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Get all items in a shopping list
router.get('/shopping-lists/:listId/items', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.params;
    try {
        const items = yield db_1.prisma.item.findMany({
            where: { shoppingListId: listId },
        });
        res.status(200).json(items);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
exports.default = router;
