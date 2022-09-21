import MatchesTeamsInterface from './interfaceMatchesTeams';

export default interface MatchesGoalsInterface extends MatchesTeamsInterface {
  homeTeamGoals: number
  awayTeamGoals: number
  result?: string
}
