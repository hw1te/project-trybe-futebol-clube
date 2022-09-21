import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

interface MockInterface {
    id: number,
    homeTeam: number,
    homeTeamGoals: number,
    awayTeam: number,
    awayTeamGoals: number,
    inProgress: boolean,
    teamHome: {
      teamName: string
    },
    teamAway: {
      teamName: string
    }
  }



const matchesMock: MockInterface[] = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo'
    },
    teamAway: {
      teamName: 'Grêmio'
    }
  },
]

describe('Testa o acesso ao endpoint /matches.', () => {
  beforeEach(() => {
   sinon.stub(Matches, "findAll").resolves(matchesMock as any);
  })

  afterEach(() => {
    sinon.restore();
  })
 it('Testa resposta da rota', async () => {
  const response = await chai.request(app).get('/matches')

  expect(response.status).to.equal(200);
 })

 it('Testa resposta da rota', async () => {
  const response = await chai.request(app).get('/matches')

  expect(response).to.equal(200);
 })
});