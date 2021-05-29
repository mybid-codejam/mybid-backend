const User = require('./user');
const Cart = require('./cart');
const Category = require('./category');
const Payment = require('./payment');
const Asset = require('./asset');
const Transaction = require('./transaction');

// sync models
(async () => {
  await User.sync({ logging: false });
  await Category.sync({ logging: false });
  await Asset.sync({ logging: false });
  await Cart.sync({ logging: false });
  await Transaction.sync({ logging: false });
  await Payment.sync({ logging: false });
})();

exports.User = User;
exports.Cart = Cart;
exports.Category = Category;
exports.Payment = Payment;
exports.Asset = Asset;
exports.Transaction = Transaction;
