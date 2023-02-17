'use strict';

const validator = (req, res, next) => {
  if (!req.query.name) {
    next('Query name Required');
  } else {
    next();
  }
};

module.exports = validator;
