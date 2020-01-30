var Sequelize = require("sequelize");

module.exports = function (database) {
    return database.define('senti', {
        senti_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        term_id : {
            type: Sequelize.INTEGER,
            primaryKey: false,
            allowNull: false,
            references: {
                model: "words",
                key: "term_id"
            }
        },
        prediction : {
            type: Sequelize.STRING(10),
            primaryKey: false,
            allowNull: false
        },
        confidence: {
            type: Sequelize.DECIMAL,
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
        tableName: 'sentiments',
        timestamps: false
    });
}