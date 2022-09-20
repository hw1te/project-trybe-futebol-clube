import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class matchesController {
  constructor(public matchesService = new MatchesService()) {}

  async getAll(_req: Request, res: Response) {
    const response = await this.matchesService.getAll();

    return res.status(200).json(response);
  }

  async create(req: Request, res: Response) {
    const { code, data } = await this.matchesService.create(req.body);

    return res.status(code).json(data);
  }

  async end(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchesService.end(Number(id));

    res.status(200).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.update(Number(id), req.body);

    return res.json({ message: 'Update done' });
  }
}
