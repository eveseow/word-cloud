var Sequelize = require("sequelize");

module.exports = function (database) {
    return database.define('word', {
        term_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        session_id : {
            type: Sequelize.INTEGER,
            primaryKey: false,
            allowNull: false,
            references: {
                model: "sessions",
                key: "session_id"
            }
        },
        term : {
            type: Sequelize.STRING(1000),
            primaryKey: false,
            allowNull: false
        },
        createdAt : {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            primaryKey: false,
            allowNull: false
        }
    }, {
        tableName: 'words',
        timestamps: false
    });
}