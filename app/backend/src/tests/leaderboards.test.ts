// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Matches from '../database/models/matches';
// import TeamsResult from '../interfaces/interfaceTeamsResult';

// import { Response } from 'superagent';
// import LeaderboardService from '../services/leaderboardService';
// import Teams from '../database/models/teams';

// chai.use(chaiHttp);

// const { expect } = chai;

// const leaderboardMock = [
//   {
//     name: 'Botafogo',
//     totalPoints: 1,
//     totalGames: 1,
//     totalVictories: 1,
//     totalDraws: 1,
//     totalLosses: 1,
//     goalsFavor: 1,
//     goalsOwn: 1,
//     goalsBalance: 1,
//     efficiency: '100'
//   },
//   {
//     name: 'Palmeiras',
//     totalPoints: 1,
//     totalGames: 1,
//     totalVictories: 1,
//     totalDraws: 1,
//     totalLosses: 1,
//     goalsFavor: 1,
//     goalsOwn: 1,
//     goalsBalance: 1,
//     efficiency: '100'
//   }
// ]

// describe('Testa o end point /teams e suas respectivas particularidades', () => {
//   beforeEach(() => [
//     sinon.stub(LeaderboardService, 'findAll' as Teams).resolves(leaderboardMock as TeamsResult[])
//   ])

//   afterEach(() => {
//     sinon.restore();
//   })
  
// })