import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db'; // Import the existing Prisma client

const router = Router();

// Create a new UserShoppingListLink entry
router.post('/user-shopping-list-links', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, shoppingListId } = req.body;
  try {
    const newUserShoppingListLink = await prisma.userShoppingListLink.create({
      data: {
        userId,
        shoppingListId,
      },
    });
    res.status(201).json(newUserShoppingListLink);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get all UserShoppingListLink entries
router.get('/user-shopping-list-links', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userShoppingListLinks = await prisma.userShoppingListLink.findMany();
    res.status(200).json(userShoppingListLinks);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get a single UserShoppingListLink entry by userId and shoppingListId
router.get('/user-shopping-list-links/:userId/:shoppingListId', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, shoppingListId } = req.params;
  try {
    const userShoppingListLink = await prisma.userShoppingListLink.findUnique({
      where: {
        userId_shoppingListId: {
          userId,
          shoppingListId,
        },
      },
    });
    if (userShoppingListLink) {
      res.status(200).json(userShoppingListLink);
    } else {
      res.status(404).json({ error: 'UserShoppingListLink entry not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Delete a UserShoppingListLink entry by userId and shoppingListId
router.delete('/user-shopping-list-links/:userId/:shoppingListId', async (req: Request, res: Response, next: NextFunction) => {
  const { userId, shoppingListId } = req.params;
  try {
    const deletedLink = await prisma.userShoppingListLink.delete({
      where: {
        userId_shoppingListId: {
          userId,
          shoppingListId,
        },
      },
    });
    res.status(200).json(deletedLink);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

export default router;