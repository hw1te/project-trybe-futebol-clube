import { Op } from 'sequelize';
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

const awayTeamResults = (matches: Matches[]): MatchesGoals[] => matches.map((match) => {
  let result;
  if (match.homeTeamGoals < match.awayTeamGoals) {
    result = 'victory';
  } else if (match.homeTeamGoals <= match.awayTeamGoals) {
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

const matchFinalResult = (matches: MatchesGoals[]) => {
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

const allTeamMatchResults = (matches: Matches[], id: number): MatchesGoals[] => {
  const homeMatches = matches.filter((match) => (
    match.homeTeam === id
  ));
  const awayMatches = matches.filter((match) => (
    match.awayTeam === id
  ));
  const homeMatchesResult = matchFinalResult(homeMatches);
  const awayMatchesResult = awayTeamResults(awayMatches);
  return { ...awayMatchesResult, ...homeMatchesResult };
};

const goalsSum = (matches: MatchesGoals[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  matches.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });

  return { goalsFavor, goalsOwn };
};

const awayGoalsSum = (matches: MatchesGoals[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  matches.forEach((match) => {
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
  });
  return { goalsFavor, goalsOwn };
};

const totalGoalsSum = (matches: MatchesGoals[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;
  matches.forEach((match) => {
    const goals = [match.awayTeamGoals, match.homeTeamGoals];
    const higherScore = Math.max(...goals);
    const lowerScore = Math.min(...goals);
    if (match.result === 'draw') {
      goalsFavor += match.homeTeamGoals;
    } else if (match.result === 'victory') {
      goalsFavor += higherScore;
      goalsOwn += lowerScore;
      goalsOwn += match.homeTeamGoals;
    } else if (match.result === 'loser') {
      goalsFavor += lowerScore;
      goalsOwn += higherScore;
    }
  });
  return { goalsFavor, goalsOwn };
};

const matchesSum = (matches: MatchesGoals[]) => {
  const resultMatchesByTeam = matchFinalResult(matches);
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
        const sumResult = matchesSum(resultMatches);
        const goalsSumTeam = goalsSum(resultMatches);

        return {
          name: team.teamName,
          ...sumResult,
          ...goalsSumTeam,
          goalsBalance: goalsSumTeam.goalsFavor - goalsSumTeam.goalsOwn,
        };
      }),
    );
    return { code: 200, data: sortTeamsOrder(finalTeamsResults) };
  };

  public getAllAway = async () => {
    const teams = await Teams.findAll();
    const finalTeamsResults = await Promise.all(
      teams.map(async (team) => {
        const matches = await Matches.findAll({ where: { awayTeam: team.id, inProgress: 0 } });
        const resultMatches = awayTeamResults(matches);
        const resultSum = matchesSum(resultMatches);
        const teamGoalsSum = awayGoalsSum(resultMatches);
        return {
          name: team.teamName,
          ...resultSum,
          ...teamGoalsSum,
          goalsBalance: teamGoalsSum.goalsFavor - teamGoalsSum.goalsOwn,
        };
      }),
    );
    return { code: 200, data: sortTeamsOrder(finalTeamsResults) };
  };

  public getAny = async () => {
    const teams = await Teams.findAll();
    const finalTeamsResults = await Promise.all(
      teams.map(async (team) => {
        const matches = await Matches.findAll(
          // https://stackoverflow.com/questions/68122497/sequelize-op-or-within-op-and-for-nested-operations
          { where: { [Op.or]: [{ awayTeam: team.id }, { homeTeam: team.id }], inProgress: 0 } },
        );
        const resultMatches = allTeamMatchResults(matches, team.id);
        const sumResult = matchesSum(resultMatches);
        const goalsSumTeam = totalGoalsSum(resultMatches);
        return {
          name: team.teamName,
          ...sumResult,
          ...goalsSumTeam,
          goalsBalance: goalsSumTeam.goalsFavor - goalsSumTeam.goalsOwn,
        };
      }),
    );
    return { code: 200, data: sortTeamsOrder(finalTeamsResults) };
  };
}
