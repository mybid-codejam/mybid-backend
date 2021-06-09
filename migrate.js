const {
  User, Category, Asset, Cart, Transaction, Payment,
} = require('./models');

// sync models
(async () => {
  await User.sync({ alter: true, logging: false, force: true });
  await Category.sync({ alter: true, logging: false, force: true });
  await Asset.sync({ alter: true, logging: false, force: true });
  await Cart.sync({ alter: true, logging: false, force: true });
  await Transaction.sync({ alter: true, logging: false, force: true });
  await Payment.sync({ alter: true, logging: false, force: true });
})();
