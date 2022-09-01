import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(public loginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { code, data } = await this.loginService.login(req.body);

    return res.status(code).json(data);
  }
}
