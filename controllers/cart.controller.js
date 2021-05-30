const { UniqueConstraintError } = require('sequelize');
const { cart } = require('../models');
const Controller = require('../core/controller');

// TODO modify this controller
class CartController extends Controller {
  // TODO ambil semua semua item dikeranjang berdasarkan id user
  async getAll() {
    const { id } = this.res.locals.user; // untuk mengambil data user id yang sedang login

    // TODO setelah mengambil data, maka tampilan lewat response
    return this.sendResponse({ message: 'success save data' });
  }

  // TODO insert data asset id ke item berdasarkan id user
  async create() {
    const validate = this.validate(['assetId']);

    if (validate) {
      const {
        id, assetId, email, createdAt, endedAt,
      } = validate;

      const user = await cart.create({
        id, assetId, email, createdAt, endedAt,
      });

      // TODO setelah insert data, maka tampilan semua item di keranjang lewat response
      return this.sendResponse({
        id: cart.id,
        assetId: cart.assetId,
        email: cart.email,
        createdAt: cart.createdAt,
        endedAt: cart.endedAt,
      }, 'Success register', 201);
    }

    return null;
  }

  // TODO delete data cart id ke item berdasarkan id user
  async delete() {
    const { id } = this.req.params;

    const data = await cart.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return null;
    }
    await cart.destroy({
      where: {
        id,
      },
    });

    // TODO setelah delete data, maka tampilan semua item di keranjang lewat response
    return this.sendResponse({
      status: 'ok',
      server_message: 'record deleted',
    });
  }
}

module.exports = CartController;
