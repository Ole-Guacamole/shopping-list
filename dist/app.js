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
// import { prisma } from "./db/index";
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
const config_1 = __importDefault(require("./config"));
(0, config_1.default)(app);
// 👇 Start handling routes here
const index_routes_1 = __importDefault(require("./routes/index.routes"));
app.use("/", index_routes_1.default);
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use("/", user_routes_1.default);
const shoppingList_routes_1 = __importDefault(require("./routes/shoppingList.routes"));
app.use("/", shoppingList_routes_1.default);
const item_routes_1 = __importDefault(require("./routes/item.routes"));
app.use("/", item_routes_1.default);
const userShoppingListLink_routes_1 = __importDefault(require("./routes/userShoppingListLink.routes"));
app.use("/", userShoppingListLink_routes_1.default);
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
app.use("/auth", auth_routes_1.default);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
const error_handling_1 = __importDefault(require("./error-handling/"));
(0, error_handling_1.default)(app);
exports.default = app;
