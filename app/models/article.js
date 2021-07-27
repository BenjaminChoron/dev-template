const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database');

class Article extends Model {};

Article.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    sequelize,
    tableName: "article"
});

module.exports = Article;