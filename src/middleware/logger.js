'use strict';

const logger = (req, res, next) => {
  req.log = {
    route: req.path,
  };
  next();
};

module.exports = logger;
