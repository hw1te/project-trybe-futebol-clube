import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/matches';
import User from '../database/models/users';
import { userMock } from './login.test';


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



  export const matchesMock: MockInterface[] = [
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

interface createInterface {
    homeTeam: number, 
    awayTeam: number, 
    homeTeamGoals: number,
    awayTeamGoals: number,
}

const createMock: createInterface = {
    homeTeam: 16, 
    awayTeam: 8, 
    homeTeamGoals: 2,
    awayTeamGoals: 2
}

describe('Testa o acesso ao endpoint /matches findAll.', () => {
  beforeEach(() => {
   sinon.stub(Matches, "findAll").resolves(matchesMock as any);
  })

  afterEach(() => {
    sinon.restore();
  })
 it('Testa resposta da rota a', async () => {
  const response = await chai.request(app).get('/matches')

  expect(response.status).to.equal(200);
 })

});


describe('Testa o acesso ao endpoint /matches create.',  () => {
  beforeEach(() => {
    sinon.stub(User, "findOne").resolves(userMock as User);
    sinon.stub(Matches, "create").resolves(createMock as any);
   })
 
   afterEach(() => {
     sinon.restore();
   })
   it('Testa resposta da rota a', async () => {
    // const token = await chai.request(app).post('/login').send({
    //   "email": "admin@admin.com",
    //   "password": "secret_admin"
    // }).then((resp) => resp.body.token)
    const response = await chai.request(app).post('/matches').set('authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjM3OTU1OTZ9.1tDG_-a_oCMTjfZCxyzgyuVHn834kIv0Gjzou72gCcw")
    .send(createMock)

    expect(response.status).to.equal(201)
   })
})