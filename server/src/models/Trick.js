const Sequelize = require('sequelize');

module.exports = sequelize => {
    return sequelize.define(
        "Trick",
        {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            complexity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: "tricks",
        },
  );
};
