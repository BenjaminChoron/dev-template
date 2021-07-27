const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database');

class Project extends Model {};

Project.init({
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    basic_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tech_content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    see_link: {
        type: DataTypes.TEXT
    },
    github_link: {
        type: DataTypes.TEXT
    },
},{
    sequelize,
    tableName: "project"
});

module.exports = Project;