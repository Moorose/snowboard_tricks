const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define(
  'ThreadParticipant',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    in_thread: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'thread_participant',
  },
);
