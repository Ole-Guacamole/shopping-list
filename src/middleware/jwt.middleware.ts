import { Request } from 'express';
import { expressjwt as jwt, Request as JWTRequest, TokenGetter } from 'express-jwt';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req: Request): string | null {
  // Check if the token is available on the request Headers
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
  return null;
}

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET as string,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders as TokenGetter,
});

// Export the middleware so that we can use it to create protected routes
export { isAuthenticated };