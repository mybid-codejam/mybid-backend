const User = require('./user');
const Cart = require('./cart');
const Category = require('./category');
const Payment = require('./payment');
const Asset = require('./asset');
const Transaction = require('./transaction');

// sync models
(async () => {
  await User.sync({ alter: false, logging: false });
  await Category.sync({ alter: false, logging: false });
  await Asset.sync({ alter: false, logging: false });
  await Cart.sync({ alter: false, logging: false });
  await Transaction.sync({ alter: false, logging: false });
  await Payment.sync({ alter: false, logging: false });
})();

exports.User = User;
exports.Cart = Cart;
exports.Category = Category;
exports.Payment = Payment;
exports.Asset = Asset;
exports.Transaction = Transaction;
