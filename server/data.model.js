var Sequelize = require("sequelize");

module.exports = function (database) {
    return database.define('data', {
        word : {
            type: Sequelize.STRING(1000),
            primaryKey: false,
            allowNull: false
        }
    }, {
        tableName: 'datas',
        timestamps: true
    });
}