import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import RequestUser from '../interfaces/interfaceRequest';
// import userPayload from '../interfaces/interfacePayload';
// import email from '../interfaces/interfacePayload';

export default class TokenMiddleware {
  validateToken = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }

      const verified = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
      req.user = verified;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
