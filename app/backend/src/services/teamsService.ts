import Teams from '../database/models/teams';
// import TeamsInterface from '../interfaces/interfaceTeams';

export interface TeamsInterface {
  id: number,
  teamName: string,
}

export default class TeamService {
  public getAll = async () => {
    const teams = await Teams.findAll();

    return { code: 200, data: teams };
  };

  public getById = async (id: number): Promise<TeamsInterface> => {
    const teams = await Teams.findByPk(id) as Teams;

    return { id, teamName: teams.teamName };
  };
}
