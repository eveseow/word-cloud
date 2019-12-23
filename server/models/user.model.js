var Sequelize = require("sequelize");

module.exports = function (database) {
    return database.define('user', {
        user_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username : {
            type: Sequelize.STRING(100),
            primaryKey: false,
            allowNull: false
        },
        password : {
            type: Sequelize.STRING(100),
            primaryKey: false,
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: false
    });
}