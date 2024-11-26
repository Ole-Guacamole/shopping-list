import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    payload?: any; // Adjust the type as needed
  }
}

// declare module 'bcrypt';

// declare namespace Express {
//   interface IUser {
//     email: string;
//     name: string;
//     id: string;
//     password?: string;
//     createdAt: string;
//   }
// }