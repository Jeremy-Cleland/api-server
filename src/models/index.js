'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const clothes = require('./clothes');
const Collection = require('./Collection');
const food = require('./food');

const DATABASE_URL =
  process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const clothesModel = clothes(sequelizeDatabase, DataTypes);
const foodModel = food(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  clothesCollection: new Collection(clothesModel),
  foodCollection: new Collection(foodModel),
};
