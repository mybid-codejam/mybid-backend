const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER,
});

class Cart extends Model { }
Cart.init({
  assetId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'assets',
      key: 'id',
    },
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'email',
    },
  },
}, {
  sequelize,
  tableName: 'carts',
});

module.exports = Cart;
