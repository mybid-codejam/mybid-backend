const { UniqueConstraintError } = require('sequelize');
const { category, transaction } = require('../models');
const Controller = require('../core/controller');

class TransactionController extends Controller {
  get() {
    return this.sendResponse({ message: 'success save data' });
  }

  async create() {
    const validate = this.validate(['id', 'assetId', 'email', 'bidPrice', 'createdAt', 'endedAt']);

    if (validate) {
      const {
        id, assetId, email, bidPrice, createdAt, endedAt,
      } = validate;

      try {
        const user = await category.create({
          id, assetId, email, bidPrice, createdAt, endedAt,
        });
        return this.sendResponse({
          id: transaction.id,
          assetId: transaction.assetId,
          email: transaction.email,
          bidPrice: transaction.bidPrice,
          createdAt: transaction.createdAt,
          endedAt: transaction.endedAt,
        }, 'Success register', 201);
      } catch (e) {
        if (e instanceof UniqueConstraintError) {
          return this.sendResponse(null, 'Email already used', 400);
        }
        return this.sendResponse(null, 'Failed', 400);
      }
    }

    return null;
  }

  async update() {
    const validate = this.validate(['assetId', 'type', 'email', 'bidPrice']);

    if (validate) {
      const {
        id, assetId, email, bidPrice, createdAt, endedAt,
      } = validate;

      try {
        await transaction.update({
          id, assetId, email, bidPrice, createdAt, endedAt,
        }, {
          where: { id },
        });

        return this.sendResponse({
          id,
          assetId,
          email,
          bidPrice,
          createdAt,
          endedAt,
        }, 'Success update');
      } catch (e) {
        if (e instanceof UniqueConstraintError) {
          return this.sendResponse(null, 'Email already used', 400);
        }
        return this.sendResponse(null, 'Failed', 400);
      }
    }

    return null;
  }

  async delete() {
    const { id } = this.req.params;
    try {
      const data = await transaction.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        return null;
      }
      await transaction.destroy({
        where: {
          id,
        },
      });
      return this.sendResponse({
        status: 'ok',
        server_message: 'record deleted',
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = TransactionController;
