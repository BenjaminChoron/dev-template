const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database');

class User extends Model {};

User.init({
    pseudo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
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
},{
    sequelize,
    tableName: "user"
});

module.exports = User;