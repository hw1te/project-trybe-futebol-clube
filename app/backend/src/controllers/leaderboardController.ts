import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(public leaderboardService = new LeaderboardService()) {}

  async getAll(_req: Request, res: Response) {
    const { code, data } = await this.leaderboardService.getAll();

    res.status(code).json(data);
  }
}
