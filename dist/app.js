"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ℹ️ Connects to the database
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
const config_1 = __importDefault(require("./config"));
(0, config_1.default)(app);
// 👇 Start handling routes here
// import authRoutes from "./routes/auth.routes";
// app.use("/auth", authRoutes);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
const error_handling_1 = __importDefault(require("./error-handling/"));
(0, error_handling_1.default)(app);
exports.default = app;
