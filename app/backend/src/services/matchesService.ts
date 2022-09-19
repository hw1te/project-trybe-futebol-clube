import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

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
}
