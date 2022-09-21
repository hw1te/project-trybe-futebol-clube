import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';
import TeamsInterface from '../interfaces/interfaceTeams'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


  const teamsMock: TeamsInterface[]= [
    {
    id: 1,
    teamName: 'Avaí/Kindermann'
  },
  {
    id: 2,
    teamName: 'Bahia'
  },
  {
    id: 3,
    teamName: 'Botafogo'
  }
]

describe('Testa o end point /teams e suas respectivas particularidades', () => {
  beforeEach(() => [
    sinon.stub(Teams, "findAll").resolves(teamsMock as Teams[])
  ])

  afterEach(() => {
    sinon.restore();
  })
  it('Testa resposta da rota', async () => {
    const response = await chai.request(app).get('/teams')
    
    expect(response.status).to.equal(200);
 })
 it('Retorna os usuários', async () => {
  const response = await chai.request(app).post('/teams')

  expect(response.body).to.be.deep.equal(teamsMock);
})
})