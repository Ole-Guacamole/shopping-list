// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
import dotenv from "dotenv";
dotenv.config();

// ℹ️ Connects to the database
// import { prisma } from "./db/index";

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express, { Application } from "express";

const app: Application = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
import config from "./config";
config(app);

// 👇 Start handling routes here

import indexRoutes from "./routes/index.routes";
app.use("/", indexRoutes);

import userRoutes from "./routes/user.routes";
app.use("/", userRoutes);

import shoppingListRoutes from "./routes/shoppingList.routes";
app.use("/", shoppingListRoutes);

import itemRoutes from "./routes/item.routes";
app.use("/", itemRoutes);

import userShoppingListLinkRoutes from "./routes/userShoppingListLink.routes";
app.use("/", userShoppingListLinkRoutes);

// import authRoutes from "./routes/auth.routes";
// app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import errorHandling from "./error-handling/";
errorHandling(app);

export default app;
