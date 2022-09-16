import { Request, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
import RequestUser from '../interfaces/interfaceRequest';
import userPayload from '../interfaces/interfacePayload';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(public loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { code, data } = await this.loginService.login(req.body);

    return res.status(code).json(data);
  }

  async getRole(req: RequestUser, res: Response) {
    const user = req.user as userPayload;
    const { code, data } = await this.loginService.getRole(user);

    return res.status(code).json(data);
  }
}
