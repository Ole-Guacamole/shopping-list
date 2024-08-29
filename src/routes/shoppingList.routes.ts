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



// Get all shopping lists
router.get('/shopping-lists', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shoppingLists = await prisma.shoppingList.findMany({
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
    next(error); // Pass the error to the error-handling 
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

// Get shopping list details along with items
router.get('/shopping-lists/:listId', async (req: Request, res: Response, next: NextFunction) => {
  const { listId } = req.params;
  console.log('listId:', listId);
  try {
    const shoppingList = await prisma.shoppingList.findUnique({
      where: { id: listId },
      include: { items: true },
    });
    if (shoppingList) {
      res.status(200).json(shoppingList);
    } else {
      res.status(404).json({ error: 'Shopping list not found' });
    }
  } catch (error) {
    console.error(`Error fetching shopping list with ID ${listId}:`, error);
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get all users a specific shopping list is shared with
router.get('/shopping-lists/:listId/shared-users', async (req: Request, res: Response, next: NextFunction) => {
  const { listId } = req.params;
  try {
    const users = await prisma.user.findMany({
      where: {
        shoppingLists: {
          some: {
            shoppingListId: listId,
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error fetching users for shopping list with ID ${listId}:`, error);
    next(error); // Pass the error to the error-handling middleware
  }
});

// Delete a specific shopping list by ID
router.delete('/shopping-lists/:listId', async (req: Request, res: Response, next: NextFunction) => {
  const { listId } = req.params;
  try {
    console.log(`Deleting user shopping list links for shopping list with ID ${listId}`);
    
    // Delete related UserShoppingListLink entries first
    await prisma.userShoppingListLink.deleteMany({
      where: {
        shoppingListId: listId,
      },
    });

    console.log(`Deleted user shopping list links for shopping list with ID ${listId}`);

    // Delete related items
    await prisma.item.deleteMany({
      where: {
        shoppingListId: listId,
      },
    });

    console.log(`Deleted items for shopping list with ID ${listId}`);

    // Delete the shopping list
    const deletedList = await prisma.shoppingList.delete({
      where: {
        id: listId,
      },
    });

    console.log(`Deleted shopping list with ID ${listId}`);

    res.status(200).json(deletedList);
  } catch (error) {
    console.error(`Error deleting shopping list with ID ${listId}:`, error);
    next(error); // Pass the error to the error-handling middleware
  }
});


export default router;