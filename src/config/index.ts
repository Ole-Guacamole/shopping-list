import cors from "cors";
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

const config = (app: express.Application): void => {
  // Because this will be hosted on a server that will accept requests from outside and it will be hosted on a server with a `proxy`, express needs to know that it should trust that setting.
  // Services like Fly use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // Debugging log to check FRONTEND_URLS
  // console.log("FRONTEND_URLS:", process.env.FRONTEND_URLS);

  // Controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      origin: process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : ["http://localhost:3000"],
      credentials: true, // Allow credentials if needed
      
    })
  );

  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};

export default config;
