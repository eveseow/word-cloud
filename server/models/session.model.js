var Sequelize = require("sequelize");

module.exports = function (database) {
    return database.define('session', {
        session_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        session_key : {
            type: Sequelize.INTEGER,
            primaryKey: false,
            allowNull: false
        },
        session_name : {
            type: Sequelize.STRING(1000),
            primaryKey: false,
            allowNull: false,
        },
        session_description : {
            type: Sequelize.STRING(5000),
            primaryKey: false,
            allowNull: false,
        },
        session_category : {
            type: Sequelize.STRING(2000),
            primaryKey: false,
            allowNull: false,
        },
        createdAt : {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            primaryKey: false,
            allowNull: false
        },
        session_status : {
            type: Sequelize.BOOLEAN,
            primaryKey: false,
            allowNull: false,
        },
    }, {
        tableName: 'sessions',
        timestamps: false
    });
}