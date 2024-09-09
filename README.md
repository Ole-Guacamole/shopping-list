# Shopping List Server

This is a Node.js server for managing shopping lists. It uses Express for handling HTTP requests, Prisma for database interactions, and TypeScript for type safety.

## Dependencies

- **bcrypt**: Library for hashing passwords.
- **cookie-parser**: Middleware for parsing cookies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module for loading environment variables from a `.env` file.
- **express**: Web framework for Node.js.
- **express-jwt**: Middleware for validating JWTs.
- **jsonwebtoken**: Library for creating and verifying JSON Web Tokens.
- **morgan**: HTTP request logger middleware.

## Dev Dependencies

- **@types/bcrypt**: Type definitions for bcrypt.
- **@types/cookie-parser**: Type definitions for cookie-parser.
- **@types/cors**: Type definitions for cors.
- **@types/express**: Type definitions for Express.
- **@types/node**: Type definitions for Node.js.
- **concurrently**: Utility for running multiple commands concurrently.
- **nodemon**: Utility for automatically restarting the node application when file changes are detected.
- **prisma**: Prisma ORM.
- **ts-node**: TypeScript execution environment for Node.js.
- **typescript**: TypeScript language.

## Folder Structure

- **src/**: Contains the source code.
  - **db/**: Database-related files.
  - **routes/**: Express route handlers.
  - **middleware/**: Custom middleware functions.
  - **controllers/**: Controller functions for handling business logic.
  - **models/**: Database models.
  - **utils/**: Utility functions.
- **dist/**: Contains the compiled JavaScript code.
- **prisma/**: Prisma schema and migration files.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL=your-database-url
TOKEN_SECRET=your-jwt-secret
FRONTEND_URLS=http://yourhot:5000
PORT=3000
```

## API Endpoints

### Authentication Routes

- **POST /auth/signup**: Creates a new user.
- **POST /auth/login**: Verifies email and password and returns a JWT.
- **GET /auth/verify**: Verifies the JWT stored on the client.

### User Routes

- **GET /users**: Retrieves all users.
- **GET /users/:id**: Retrieves a single user by ID.
- **PUT /users/:id:** Updates a user by ID.
- **DELETE /users/:id:** Deletes a user by ID.
- **GET /users/:userId/shopping-lists:** Retrieves all shopping lists for a user.
- **GET /users/:userId/shared-shopping-lists:** Retrieves all shopping lists shared with a user.

### Shopping List Routes

- **POST /shopping-lists**: Creates a new shopping list.
- **GET /shopping-lists**: Retrieves all shopping lists.
- **GET /shopping-lists/:listId**: Retrieves a single shopping list by ID.
- **PUT /shopping-lists/:listId**: Updates a shopping list by ID.
- **DELETE /shopping-lists/:listId**: Deletes a shopping list by ID.
- **GET /shopping-lists/:listId/items**: Retrieves all items in a shopping list.
- **GET /shopping-lists/:listId/shared-users**: Retrieves all users a specific shopping list is shared with.

### Item Routes

- **POST /items**: Creates a new item.
- **GET /items**: Retrieves all items.
- **GET /items/:id**: Retrieves a single item by ID.
- **PUT /items/:id**: Updates an item by ID.
- **DELETE /items/:id**: Deletes an item by ID.

### User Shopping List Link Routes

- **POST /user-shopping-list-links**: Creates a new UserShoppingListLink entry.
- **GET /user-shopping-list-links**: Retrieves all UserShoppingListLink entries.
- **GET /user-shopping-list-links/:userId/:shoppingListId**: Retrieves a single UserShoppingListLink entry by userId and shoppingListId.
- **DELETE /user-shopping-list-links/:userId/:shoppingListId**: Deletes a UserShoppingListLink entry by userId and shoppingListId.

### Prisma Schema

- **User:** Represents users of the application.
- **ShoppingList:** Represents a shopping list that users can create and manage.
- **Item:** Defines individual items within a shopping list.
- **UserShoppingListLink:** Manages the many-to-many relationship between users and shopping lists.

### License

- This project is licensed under the MIT License.
