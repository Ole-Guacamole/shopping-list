import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../db'; // Import the existing Prisma client

const router = Router();

// Create a new item
router.post('/items', async (req: Request, res: Response, next: NextFunction) => {
  const { name, quantity, shoppingListId } = req.body;
  try {
    const newItem = await prisma.item.create({
      data: {
        name,
        quantity,
        shoppingListId,
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get all items
router.get('/items', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Get a single item by ID
router.get('/items/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: { id },
    });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Update an item by ID
router.put('/items/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedItem = await prisma.item.update({
      where: { id },
      data: { name, quantity },
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

export default router;