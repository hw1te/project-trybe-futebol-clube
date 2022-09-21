import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';
import userPayload from '../interfaces/interfacePayload';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: userPayload = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

describe('Testa o acesso ao endpoint /login.', () => {
  beforeEach(() => {
   sinon.stub(User, "findOne").resolves(userMock as User);
  })

  afterEach(() => {
    sinon.restore();
  })
  it('Testa resposta da rota', async () => {
     const response = await chai.request(app).post('/login')
     
     expect(response.status).to.equal(201);
  })

  it('Retorna os usuários', async () => {
    const response = await chai.request(app).get('/login')
    
    expect(response.body).to.be.deep.equal(userMock);
  })
  
  it('Testa validação de usuario', async ()  => {
    const response = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: 'secret' })

    expect(response.status).to.equal(400)
  })
  it('Testa validação de senha', async ()  => {
    const response = await chai.request(app).post('/login')
    .send({ email: 'admin@admin.com', password: '' })

    expect(response.status).to.equal(400)
  })

  it('Testa validação de email', async ()  => {
    const response = await chai.request(app).post('/login')
    .send({ email: '', password: 'secret_admin' })

    expect(response.status).to.equal(400)
  })


  it('Testa validação de role', async ()  => {
    const response = await chai.request(app).get('/login/validate')
    .send({ role: '' })
  
    expect(response).to.equal(response)
  })
});