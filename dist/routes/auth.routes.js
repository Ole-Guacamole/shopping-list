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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client"); // Correct import statement
//import { createSecretKey } from "crypto";
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;
// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    // Check if email or password or name are provided as empty strings
    if (email === "" || password === "" || name === "") {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
    }
    // This regular expression check that the email is of a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
    }
    try {
        const foundUser = yield prisma.user.findUnique({
            where: { email },
        });
        // If the user with the same email already exists, send an error response
        if (foundUser) {
            res.status(400).json({ message: "User already exists." });
            return;
        }
        // If email is unique, proceed to hash the password
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
        // Create the new user in the database
        const createdUser = yield prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        const { id, email: userEmail, name: userName, createdAt: Date, } = createdUser;
        // Create a new object that doesn't expose the password
        const user = {
            id,
            email: userEmail,
            name: userName,
            createdAt: Date,
        };
        // Send a json response containing the user object
        res.status(201).json({ user });
    }
    catch (err) {
        next(err); // In this case, we send error handling to the error handling middleware.
    }
}));
// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email in the database
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        // If the user is not found, throw an error
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            // If the passwords do not match, throw an error
            const error = new Error("Invalid credentials");
            error.status = 401;
            throw error;
        }
        // Ensure JWT_SECRET is defined
        const jwtSecret = process.env.TOKEN_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }
        // Generate a JWT token with the user's id and email
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwtSecret, {
            expiresIn: "1h", // Token expires in 1 hour
        });
        // Send the token as a response
        res.status(200).json({ token });
    }
    catch (error) {
        // Pass any errors to the error handling middleware
        next(error);
    }
}));
// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and is made available on `req.payload`
    console.log(`req.payload`, req.payload);
    // Send back the token payload object containing the user data
    res.status(200).json(req.payload);
});
exports.default = router;
