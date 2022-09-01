// import * as jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';

// export default class TokenMiddleware {
//   validateToken = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       let token = req.headers.authorization;
//       if (!token) {
//         return res.status(401).json({ message: 'Token not found' });
//       }
//       token = token.replace('Bearer ', '');

//       const payload = jwt.verify(token, process.env.JWT_SECRET as string);
//       req.user = payload;

//       return next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Expired or invalid token' });
//     }
//   };
// }
