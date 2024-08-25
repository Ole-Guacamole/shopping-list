import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db'; 

const router = Router();

// Create a new shopping list
router.post('/shopping-lists', async (req: Request, res: Response, next: NextFunction) => {
  const { name, ownerId } = req.body;
  try {
    const shoppingList = await prisma.shoppingList.create({
      data: {
        name,
        ownerId,
      },
    });
    res.status(201).json(shoppingList);
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

// Add a user to a shopping list
router.post('/shopping-lists/:listId/users', async (req: Request, res: Response, next: NextFunction) => {
  const { listId } = req.params;
  const { userId } = req.body;
  try {
    const userShoppingList = await prisma.userShoppingListLink.create({
      data: {
        userId,
        shoppingListId: listId,
      },
    });
    res.status(201).json(userShoppingList);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Edit a shopping list
router.put('/shopping-lists/:listId', async (req: Request, res: Response, next: NextFunction) => {
  const { listId } = req.params;
  const { name } = req.body;
  try {
    const shoppingList = await prisma.shoppingList.update({
      where: { id: listId },
      data: { name },
    });
    res.status(200).json(shoppingList);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get all items in a shopping list
router.get('/shopping-lists/:listId/items', async (req: Request, res: Response, next: NextFunction) => {
  const { listId } = req.params;
  try {
    const items = await prisma.item.findMany({
      where: { shoppingListId: listId },
    });
    res.status(200).json(items);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

export default router;