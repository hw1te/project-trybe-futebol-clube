import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class teamsController {
  constructor(public teamsService = new TeamsService()) {}

  async getAll(req: Request, res: Response) {
    const { code, data } = await this.teamsService.getAll();

    return res.status(code).json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this.teamsService.getById(Number(id));

    return res.status(200).json(response);
  }
}
