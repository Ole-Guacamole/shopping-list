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

export default router;