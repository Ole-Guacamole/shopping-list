import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client"; // Correct import statement
//import { createSecretKey } from "crypto";

const prisma = new PrismaClient();
const router = Router();

// Adding interfaces for typescript
interface IError extends Error {
  status?: number;
}

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
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
      const foundUser = await prisma.user.findUnique({
        where: { email },
      });

      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create the new user in the database
      const createdUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const {
        id,
        email: userEmail,
        name: userName,
        createdAt: Date,
      } = createdUser;

      // Create a new object that doesn't expose the password
      const user: Omit<User, "password"> = {
        id,
        email: userEmail,
        name: userName,
        createdAt: Date,
      };

      // Send a json response containing the user object
      res.status(201).json({ user });
    } catch (err) {
      next(err); // In this case, we send error handling to the error handling middleware.
    }
  }
);

// POST  /auth/login - Verifies email and password and returns a JWT
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      // Find the user by email in the database
      const user = await prisma.user.findUnique({
        where: { email },
      });

      // If the user is not found, throw an error
      if (!user) {
        const error: IError = new Error("User not found");
        error.status = 404;
        throw error;
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        // If the passwords do not match, throw an error
        const error: IError = new Error("Invalid credentials");
        error.status = 401;
        throw error;
      }

      // Ensure JWT_SECRET is defined
      const jwtSecret = process.env.TOKEN_SECRET as string;
      if (!jwtSecret) {
        throw new Error(
          "JWT_SECRET is not defined in the environment variables"
        );
      }

      // Generate a JWT token with the user's id and email
      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: "1h", // Token expires in 1 hour
      });

      // Send the token as a response
      res.status(200).json({ token });
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  }
);


// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and is made available on `req.payload`
    console.log(`req.payload`, req.payload);
  
    // Send back the token payload object containing the user data
    res.status(200).json(req.payload);
  });

export default router;
