// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
import dotenv from "dotenv";
dotenv.config();

// ℹ️ Connects to the database


// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
import express, { Application } from "express";

const app: Application = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
import config from "./config";
config(app);

// 👇 Start handling routes here
// import authRoutes from "./routes/auth.routes";
// app.use("/auth", authRoutes);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
import errorHandling from "./error-handling/";
errorHandling(app);

export default app;
