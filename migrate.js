const {
  User, Category, Asset, Cart, Transaction, Payment,
} = require('./models');

// sync models
(async () => {
  await User.sync({ alter: true, logging: false, force: false });
  await Category.sync({ alter: true, logging: false, force: false });
  await Asset.sync({ alter: true, logging: false, force: false });
  await Cart.sync({ alter: true, logging: false, force: false });
  await Transaction.sync({ alter: true, logging: false, force: false });
  await Payment.sync({ alter: true, logging: false, force: false });
})();
