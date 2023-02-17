'use strict';

const express = require('express');
const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const validator = require('./middleware/validator.js');
const logger = require('./middleware/logger.js');
const clothesRouter = require('./routes/clothes.js');
const foodRouter = require('./routes/food.js');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(clothesRouter);
app.use(foodRouter);
app.use(logger);

app.get('/', logger, (req, res, next) => {
  res.status(200).send('Welcome to main route!');
});

app.get('/food', validator, (req, res, next) => {
  console.log('This is the query from server.js', req.query);
  res.status(200).json(req.query);
});

app.get('/person', validator, (req, res, next) => {
  console.log('This is the query from server.js', req.query);
  res.status(200).json(req.query);
});

function start() {
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
}

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  app: app,
  start: start,
};
