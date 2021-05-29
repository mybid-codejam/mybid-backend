const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
});

class Payment extends Model { }
Payment.init({
  transactionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'transactions',
      key: 'id',
    },
  },
  type: { allowNull: false, type: DataTypes.STRING },
  status: { allowNull: false, type: DataTypes.INTEGER },
}, {
  sequelize,
  tableName: 'payments',
});

module.exports = Payment;
