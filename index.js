'use strict';

const { start } = require('./src/server');

const { sequelizeDatabase } = require('./src/models/index');

sequelizeDatabase
  .sync()
  .then(() => {
    console.log('Successful Connection!');
    start();
  })
  .catch((error) => console.error(error));
