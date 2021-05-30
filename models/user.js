const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
});

class User extends Model { }
User.init({
  email: { allowNull: false, type: DataTypes.STRING },
  password: { allowNull: false, type: DataTypes.STRING },
  firstName: { allowNull: false, type: DataTypes.STRING, defaultValue: '' },
  lastName: { allowNull: false, type: DataTypes.STRING, defaultValue: '' },
  address: { allowNull: false, type: DataTypes.TEXT, defaultValue: '' },
  apiToken: { allowNull: true, type: DataTypes.STRING },
  lastLogin: { allowNull: true, type: DataTypes.DATE },
}, {
  sequelize,
  tableName: 'users',
});

module.exports = User;
