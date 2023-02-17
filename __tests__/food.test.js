'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models/index');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('food server', () => {
  it('adds food', async () => {
    const response = await request.post('/food').send({
      type: 'Ribeye',
      main: 'Family',
      side: 'Dinner',
    });

    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('Ribeye');
    expect(response.body.main).toEqual('Family');
    expect(response.body.side).toEqual('Dinner');
    expect(response.body.id).toBeTruthy();
  });

  it('gets meal', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(200);
    expect(response.body[0].type).toEqual('Ribeye');
    expect(response.body[0].main).toEqual('Family');
    expect(response.body[0].side).toEqual('Dinner');
    expect(response.body[0].id).toBeTruthy();
  });

  it('gets all meals', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deletes an meal', async () => {
    const response = await request.delete('/food/1');
    expect(response.status).toEqual(200);
  });

  it('updates an meal', async () => {
    const response = await request.put('/food/1').send({
      meal: 'T-bone',
      main: 'Family',
      side: 'Dinner',
    });
    expect(response.status).toEqual(200);
  });
});
