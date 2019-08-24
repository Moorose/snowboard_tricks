const Sequelize = require('sequelize');

module.exports = sequelize => {
    return sequelize.define(
        "User",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            nickname: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            fullName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: "users",
        },
    );
};
