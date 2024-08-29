import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db'; // Import the existing Prisma client

const router = Router();

// Create a new user
// router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
//   const { name, email } = req.body;
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//       },
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     next(error); // Pass the error to the error-handling middleware
//   }
// });

// Get all users
router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get a single user by ID
router.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Update a user by ID
router.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get all shopping lists for a user
router.get('/users/:userId/shopping-lists', async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const shoppingLists = await prisma.shoppingList.findMany({
      where: { ownerId: userId },
      include: { items: true, users: true },
    });
    res.status(200).json(shoppingLists);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});


// Get all shopping lists shared with a user by user ID
router.get('/users/:userId/shared-shopping-lists', async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    console.log(`Fetching shopping list links for user with ID ${userId}`);
    
    // First, find the links in UserShoppingListLink that reference the user
    const userShoppingListLinks = await prisma.userShoppingListLink.findMany({
      where: {
        userId: userId,
      },
    });

    console.log(`Found userShoppingListLinks:`, userShoppingListLinks);

    // Extract the shoppingListIds from the links
    const shoppingListIds = userShoppingListLinks.map(link => link.shoppingListId);

    console.log(`Extracted shoppingListIds:`, shoppingListIds);

    // Fetch the shopping lists based on the extracted shoppingListIds
    const shoppingLists = await prisma.shoppingList.findMany({
      where: {
        id: {
          in: shoppingListIds,
        },
      },
      include: {
        owner: true,
        items: true,
      },
    });

    console.log(`Found shoppingLists:`, shoppingLists);

    res.status(200).json(shoppingLists);
  } catch (error) {
    console.error(`Error fetching shopping lists for user with ID ${userId}:`, error);
    next(error); // Pass the error to the error-handling middleware
  }
});

export default router;