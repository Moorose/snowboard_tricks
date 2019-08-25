const Sequelize = require('sequelize');

module.exports = sequelize => {
    return sequelize.define(
        "UserTrick",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            is_done: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: "usertrick",
        },
    );
};
