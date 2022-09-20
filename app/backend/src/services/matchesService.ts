import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import MatchesInterface from '../interfaces/interfaceMatchesTeams';
import MatchesValidate from '../interfaces/interfaceMatchesValidate';
import MatchesGoalsInterface from '../interfaces/interfaceMatchesGoals';

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

  public create = async (matches: MatchesInterface): Promise<MatchesValidate> => {
    if (matches.awayTeam === matches.homeTeam) {
      return { code: 401,
        data: { message: 'It is not possible to create'
       + ' a match with two equal teams' },
      };
    }
    const homeTeam = await Matches.findByPk(matches.homeTeam);
    const awayTeam = await Matches.findByPk(matches.awayTeam);
    if (!homeTeam || !awayTeam) {
      return {
        code: 404,
        data: { message: 'There is no team with such id!' },
      };
    }
    const result = await Matches.create({ ...matches, inProgress: true });

    return { code: 201, data: result };
  };

  public end = async (id: number): Promise<void> => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  public update = async (id: number, matches: MatchesGoalsInterface): Promise<void> => {
    await Matches.update(
      { ...matches },
      { where: { id } },
    );
  };
}
