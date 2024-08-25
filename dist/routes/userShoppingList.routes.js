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
// Create a new UserShoppingListLink entry
router.post('/user-shopping-list-links', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, shoppingListId } = req.body;
    try {
        const newUserShoppingListLink = yield db_1.prisma.userShoppingListLink.create({
            data: {
                userId,
                shoppingListId,
            },
        });
        res.status(201).json(newUserShoppingListLink);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Get all UserShoppingListLink entries
router.get('/user-shopping-list-links', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userShoppingListLinks = yield db_1.prisma.userShoppingListLink.findMany();
        res.status(200).json(userShoppingListLinks);
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
// Get a single UserShoppingListLink entry by userId and shoppingListId
router.get('/user-shopping-list-links/:userId/:shoppingListId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, shoppingListId } = req.params;
    try {
        const userShoppingListLink = yield db_1.prisma.userShoppingListLink.findUnique({
            where: {
                userId_shoppingListId: {
                    userId,
                    shoppingListId,
                },
            },
        });
        if (userShoppingListLink) {
            res.status(200).json(userShoppingListLink);
        }
        else {
            res.status(404).json({ error: 'UserShoppingListLink entry not found' });
        }
    }
    catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
}));
exports.default = router;
