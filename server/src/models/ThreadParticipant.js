const Sequelize = require('sequelize');

module.exports = sequelize => {
    return sequelize.define(
        "ThreadParticipant",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            body: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            tableName: "thread_participant",
        },
    );
};
