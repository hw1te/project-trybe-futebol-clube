import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

export default interface RequestUser extends Request {
  user: jwt.JwtPayload,
}
