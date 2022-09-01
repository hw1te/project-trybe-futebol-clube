import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o acesso ao endpoint /login.', () => {
  it('Testa resposta da rota', async () => {
     sinon.stub(User, "findOne").resolves(null);

     const response = await chai.request(app).get('/login')
     
     expect(response.status).to.equal(200);

     sinon.restore();
  })

  it('Retorna os usuários', async () => {
    sinon.stub(User, "findOne").resolves(null);

    const response = await chai.request(app).get('/login')


    expect(response.body).to.be.deep.equal(null);

    sinon.restore();
  })
});