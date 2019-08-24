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
            in_thread: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },
        {
            timestamps: true,
            tableName: "thread_participant",
        },
    );
};
