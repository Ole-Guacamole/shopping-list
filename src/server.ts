import app from "./app";
import { prisma } from "./db/index";

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const startServer = async () => {
  console.log("Starting server...");

  try {
    // Test the database connection
    console.log("Connecting to the database...");
    await prisma.$connect();
    console.log("Database connected successfully");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with failure
  }
};

// Start the server
startServer();