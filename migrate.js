require('dotenv').config(); // register .env
const {
  User, Category, Asset, Cart, Transaction, Payment,
} = require('./models');

// sync models
(async () => {
  await User.sync({ alter: true, logging: true, force: false });
  await Category.sync({ alter: true, logging: true, force: false });
  await Asset.sync({ alter: true, logging: true, force: false });
  await Cart.sync({ alter: true, logging: true, force: false });
  await Transaction.sync({ alter: true, logging: true, force: false });
  await Payment.sync({ alter: true, logging: true, force: false });
})();
