"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config = (app) => {
    // Because this will be hosted on a server that will accept requests from outside and it will be hosted on a server with a `proxy`, express needs to know that it should trust that setting.
    // Services like Fly use something called a proxy and you need to add this to your server
    app.set("trust proxy", 1);
    // Debugging log to check FRONTEND_URLS
    // console.log("FRONTEND_URLS:", process.env.FRONTEND_URLS);
    // Controls a very specific header to pass headers from the frontend
    app.use((0, cors_1.default)({
        origin: process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : ["http://localhost:3000"],
        credentials: true, // Allow credentials if needed
    }));
    // In development environment the app logs
    app.use((0, morgan_1.default)("dev"));
    // To have access to `body` property in the request
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
};
exports.default = config;
