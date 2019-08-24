const Sequelize = require('sequelize');

module.exports = sequelize => {
    return sequelize.define(
        "Thread",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            trick_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['user_id', 'trick_id']
                }
            ],
            timestamps: true,
            tableName: "thread_participant",
        },
    );
};
