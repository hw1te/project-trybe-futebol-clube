import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import MatchesGoals from '../interfaces/interfaceMatchesGoals';
import TeamsResult from '../interfaces/interfaceTeamsResult';

const matchResults = (matches: Matches[]) => matches.map((match) => {
  let result: string;

  if (match.homeTeamGoals > match.awayTeamGoals) {
    result = 'victory';
  } else if (match.homeTeamGoals >= match.awayTeamGoals) {
    result = 'draw';
  } else {
    result = 'loser';
  }
  return {
    homeTeamGoals: match.homeTeamGoals,
    awayTeamGoals: match.awayTeamGoals,
    result,
  };
});

const sumGoals = (matches: MatchesGoals[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  matches.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });

  return { goalsFavor, goalsOwn };
};
const totalResult = (matches: MatchesGoals[]) => {
  let [totalVictories, totalDraws, totalLosses] = [0, 0, 0];
  matches.forEach((match) => {
    if (match.result === 'victory') {
      totalVictories += 1;
    } else if (match.result === 'draw') {
      totalDraws += 1;
    } else if (match.result === 'loser') {
      totalLosses += 1;
    }

    return null;
  });
  return { totalVictories, totalDraws, totalLosses };
};

const sumMatches = (matches: MatchesGoals[]) => {
  const resultMatchesByTeam = totalResult(matches);
  const totalPoints = resultMatchesByTeam.totalVictories * 3 + resultMatchesByTeam.totalDraws;
  const totalGames = matches.length;
  const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return {
    ...resultMatchesByTeam, totalPoints, totalGames, efficiency,
  };
};

const sortTeamsOrder = (resultTeam: TeamsResult[]) => resultTeam.sort((team, otherTeam) => {
  if (otherTeam.totalPoints > team.totalPoints) return 1;
  if (otherTeam.totalPoints < team.totalPoints) return -1;
  if (otherTeam.totalVictories > team.totalVictories) return 1;
  if (otherTeam.totalVictories < team.totalVictories) return -1;
  if (otherTeam.goalsBalance > team.goalsBalance) return 1;
  if (otherTeam.goalsBalance < team.goalsBalance) return -1;
  if (otherTeam.goalsFavor > team.goalsFavor) return 1;
  if (otherTeam.goalsFavor < team.goalsFavor) return -1;
  if (otherTeam.goalsOwn > team.goalsOwn) return -1;
  if (otherTeam.goalsOwn < team.goalsOwn) return 1;

  return 0;
});

export default class leaderboardService {
  public getAll = async () => {
    const teams = await Teams.findAll();
    const finalTeamsResults = await Promise.all(
      teams.map(async (team) => {
        const matches = await Matches.findAll({ where: { homeTeam: team.id, inProgress: 0 } });
        const resultMatches = matchResults(matches);
        const sumResult = sumMatches(resultMatches);
        const sumGoalsTeam = sumGoals(resultMatches);
        return {
          name: team.teamName,
          ...sumResult,
          ...sumGoalsTeam,
          goalsBalance: sumGoalsTeam.goalsFavor - sumGoalsTeam.goalsOwn,
        };
      }),
    );
    return { code: 200, data: sortTeamsOrder(finalTeamsResults) };
  };
}
