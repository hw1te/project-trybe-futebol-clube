import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class matchesController {
  constructor(public matchesService = new MatchesService()) {}

  async getAll(_req: Request, res: Response) {
    const response = await this.matchesService.getAll();

    return res.status(200).json(response);
  }

  async create(req: Request, res: Response) {
    const response = await this.matchesService.create(req.body);

    return res.status(201).json(response);
  }

  // async getById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const response = await this.teamsService.getById(Number(id));

  //   return res.status(200).json(response);
  // }
}
