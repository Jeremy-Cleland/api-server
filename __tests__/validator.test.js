'use strict';

const validator = require('../src/middleware/validator');

describe('validator', () => {
  let req = { query: { name: 'Jeremy' } };
  let res = {};
  let next = jest.fn();

  test('validates query as expected', () => {
    validator(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
  test('fails appropriately if no query name', () => {
    req = { query: { notName: 'Ryan' } };
    validator(req, res, next);

    expect(next).toHaveBeenCalledWith('Query name Required');
  });
});
