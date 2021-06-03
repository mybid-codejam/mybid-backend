const { Cart, Asset } = require('../models');
const Controller = require('../core/controller');
const { CartCollection } = require('../collections');
const ResponseError = require('../exceptions/response.error');

class CartController extends Controller {
  async getAll() {
    const { id } = this.res.locals.user;

    const carts = await Cart.findAll({ where: { userId: id } });
    const data = await CartCollection.toArray(carts);

    return this.sendResponse(data);
  }

  async create() {
    const { id } = this.res.locals.user;
    const validate = this.validate(['assetId']);

    if (validate) {
      const { assetId } = validate;
      const asset = await Asset.findOne({ where: { id: assetId } });
      if (asset === null) {
        throw new ResponseError('Asset not found', 404);
      }

      const cart = await Cart.create({
        assetId, userId: id,
      });

      const data = await CartCollection.toJSON(cart);
      return this.sendResponse(data, 'Success add to cart', 201);
    }
    return null;
  }

  async delete() {
    const { id } = this.req.params;
    const userId = this.res.locals.user.id;

    const cart = await Cart.findOne({ where: { id, userId } });
    if (cart === null) {
      throw new ResponseError('Cart not found', 404);
    }

    await Cart.destroy({ where: { id } });
    return this.sendResponse('Delete success');
  }
}

module.exports = CartController;
