const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'Trick',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    complexity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    videoKey: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: 'trick',
  },
);
