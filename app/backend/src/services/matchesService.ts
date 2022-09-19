import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

export interface MatchesInterface {
  homeTeam: number
  awayTeam: number
  homeTeamGoals: number
  awayTeamGoals: number
}

export default class matchesService {
  public getAll = async (): Promise<Matches[]> => {
    const matches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  };

  public create = async (matches: MatchesInterface): Promise<Matches> => {
    const result = await Matches.create({
      ...matches, inProgress: true,
    });

    return result;
  };
}
