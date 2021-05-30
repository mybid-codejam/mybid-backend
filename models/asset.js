const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
});

class Asset extends Model { }
Asset.init({
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'email',
    },
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  name: { allowNull: false, type: DataTypes.STRING, defaultValue: '' },
  description: { allowNull: false, type: DataTypes.TEXT, defaultValue: '' },
  document: { allowNull: false, type: DataTypes.TEXT, defaultValue: '' },
  images: { allowNull: false, type: DataTypes.TEXT, defaultValue: '[]' },
  basePrice: { allowNull: false, type: DataTypes.INTEGER, defaultValue: 0 },
  isSold: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: false },
  endedAt: { allowNull: false, type: DataTypes.DATE, defaultValue: new Date().toISOString() },
}, {
  sequelize,
  tableName: 'assets',
});

module.exports = Asset;
