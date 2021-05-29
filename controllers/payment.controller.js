const { UniqueConstraintError } = require('sequelize');
const { payment } = require('../models');
const Controller = require('../core/controller');

class PaymentController extends Controller {
  get() {
    return this.sendResponse({ message: 'success save  data' });
  }

  async create() {
    const validate = this.validate(['id', 'transactionId', 'type', 'status', 'createdAt', 'updateAt']);

    if (validate) {
      const {
        id, transactionId, type, status, createdAt, updateAt
      } = validate;

      try {
        const user = await category.create({
          id, transactionId, type, status, createdAt, updateAt
        });
        return this.sendResponse({
          id: payment.id,
          transactionId: payment.transactionId,
          type: payment.type,
          status : payment.status,
          createdAt: payment.createdAt,
          updateAt: payment.updateAt
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
    const { id } = this.req.params;
    const validate = this.validate(['id', 'transactionId', 'type', 'status', 'createdAt', 'updateAt']);

    if (validate) {
      const {
        id, transactionId, type, status, createdAt, updateAt
      } = validate;

      try {
        await cartegory.update({
          id, transactionId, type, status, createdAt, updateAt
        }, {
          where: { id },
        });

        return this.sendResponse({
          id,
          transactionId,
          type,
          status,
          createdAt,
          updateAt
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
  async delete(){
  const { id } = req.params;
  try {
    const data = await payment.findOne({
      where : {
        id: id
    }
  })
    if(!data){
      return null
    }
    await payment.destroy({
      where : {
        id: id
      }
    })
    return this.sendResponse({
      status : 'ok',
      server_message : 'record deleted'
    })
  } catch (err) {
    console.log(err)
    return null
  }
}
}

module.exports = PaymentController;