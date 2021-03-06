const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
});

class Category extends Model { }
Category.init({
  name: { allowNull: false, type: DataTypes.STRING, defaultValue: '' },
}, {
  sequelize,
  tableName: 'categories',
});

module.exports = Category;
