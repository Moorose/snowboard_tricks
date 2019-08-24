const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const {db} = require('../../config')[env];

const sequelize = new Sequelize(db.name, db.username, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
    logging: db.logging,
    operatorsAliases: false,
});

const Trick = require("./Trick")(sequelize);
const User = require("./User")(sequelize);
const UserTrick = require("./UserTrick")(sequelize);
const ThreadParticipant = require("./ThreadParticipant")(sequelize);
const Thread = require("./Thread")(sequelize);
const Message = require("./Message")(sequelize);


User.belongsToMany(Trick, {through: UserTrick});
Trick.belongsToMany(User, {through: UserTrick});

User.hasMany(ThreadParticipant);
User.hasMany(Message);
Thread.hasMany(Message);
Thread.hasMany(ThreadParticipant);
UserTrick.hasMany(Thread);

module.exports = {
    sequelize,
    Trick,
    User,
    UserTrick
};
