const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database');

class Message extends Model {};

Message.init({
    from: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    first_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    last_name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
        type: DataTypes.TEXT
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
},{
    sequelize,
    tableName: "message"
});

module.exports = Message;