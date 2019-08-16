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

const Trick = require("./Trick")(sequelize);


// module.exports =   Trick;
module.exports = {
  sequelize,
  Trick
};