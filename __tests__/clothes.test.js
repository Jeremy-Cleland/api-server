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

describe('clothes server', () => {
  it('adds clothes', async () => {
    const response = await request.post('/clothes').send({
      clothesType: 'T-shirt',
      color: 'blue',
      brand: 'Nike',
    });

    expect(response.status).toEqual(200);
    expect(response.body.clothesType).toEqual('T-shirt');
    expect(response.body.color).toEqual('blue');
    expect(response.body.brand).toEqual('Nike');
    expect(response.body.id).toBeTruthy();
  });

  it('gets a clothing item', async () => {
    const response = await request.get('/clothes');
    expect(response.status).toEqual(200);
    expect(response.body[0].clothesType).toEqual('T-shirt');
    expect(response.body[0].color).toEqual('blue');
    expect(response.body[0].brand).toEqual('Nike');
    expect(response.body[0].id).toBeTruthy();
  });

  it('gets all clothing items', async () => {
    const response = await request.get('/clothes');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deletes an clothing item', async () => {
    const response = await request.delete('/clothes/1');
    expect(response.status).toEqual(200);
  });

  it('updates a clothing item', async () => {
    const response = await request.put('/clothes/1').send({
      clothesType: 'T-shirt',
      color: 'blue',
      brand: 'Nike',
    });
    expect(response.status).toEqual(200);
  });
});
