const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const { db } = require('../../config')[env];

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  logging: db.logging,
  operatorsAliases: false,
});

const Trick = require('./Trick')(sequelize);
const User = require('./User')(sequelize);
const UserTrick = require('./UserTrick')(sequelize);

User.belongsToMany(Trick, { through: UserTrick });
Trick.belongsToMany(User, { through: UserTrick });

module.exports = {
  sequelize,
  Trick,
  User,
    UserTrick,
};
