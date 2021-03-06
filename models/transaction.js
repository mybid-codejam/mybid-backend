const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
});

class Transaction extends Model { }
Transaction.init({
  assetId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'assets',
      key: 'id',
    },
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  bidPrice: { allowNull: false, type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  sequelize,
  tableName: 'transactions',
});

module.exports = Transaction;
