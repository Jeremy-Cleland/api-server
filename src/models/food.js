'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('food', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    main: {
      type: DataTypes.STRING,
      allowNullL: true,
    },
    side: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
