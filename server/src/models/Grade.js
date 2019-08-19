const Sequelize = require('sequelize');

module.exports = sequelize => {
    return sequelize.define(
        "Grade",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            mark: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            }
        },
        {
            timestamps: false,
            tableName: "grade",
        },
    );
};
