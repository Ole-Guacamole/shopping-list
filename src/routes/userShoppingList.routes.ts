import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db'; // Import the existing Prisma client

const router = Router();

// Create a new UserShoppingList entry
router.post('/user-shopping-lists', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, shoppingListId } = req.body;
  try {
    const newUserShoppingList = await prisma.userShoppingList.create({
      data: {
        userId,
        shoppingListId,
      },
    });
    res.status(201).json(newUserShoppingList);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get all UserShoppingList entries
router.get('/user-shopping-lists', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userShoppingLists = await prisma.userShoppingList.findMany();
    res.status(200).json(userShoppingLists);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get a single UserShoppingList entry by userId and shoppingListId
router.get('/user-shopping-lists/:userId/:shoppingListId', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, shoppingListId } = req.params;
  try {
    const userShoppingList = await prisma.userShoppingList.findUnique({
      where: {
        userId_shoppingListId: {
          userId,
          shoppingListId,
        },
      },
    });
    if (userShoppingList) {
      res.status(200).json(userShoppingList);
    } else {
      res.status(404).json({ error: 'UserShoppingList entry not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Delete a UserShoppingList entry by userId and shoppingListId
router.delete('/user-shopping-lists/:userId/:shoppingListId', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, shoppingListId } = req.params;
  try {
    await prisma.userShoppingList.delete({
      where: {
        userId_shoppingListId: {
          userId,
          shoppingListId,
        },
      },
    });
    res.status(204).send();
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

export default router;