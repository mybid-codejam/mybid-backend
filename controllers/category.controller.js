const { UniqueConstraintError } = require('sequelize');
const { category } = require('../models');
const Controller = require('../core/controller');

class CategoryController extends Controller {
  get() {
    return this.sendResponse({ message: 'success save  data' });
  }

  async create() {
    const validate = this.validate(['id', 'name', 'createdAt', 'updateAt']);

    if (validate) {
      const {
        id, name, createdAt, updateAt
      } = validate;

      try {
        const user = await category.create({
          id, name, createdAt, updateAt
        });
        return this.sendResponse({
          id: category.id,
          name: category.name,
          createdAt: category.createdAt,
          updateAt: category.updateAt
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
    const { assetId } = this.req.params;
    const validate = this.validate(['id', 'name', 'createdAt', 'updateAt']);

    if (validate) {
      const {
        id, name, createdAt, updateAt
      } = validate;

      try {
        await category.update({
          id, name, createdAt, updateAt
        }, {
          where: { id },
        });

        return this.sendResponse({
          id,
          name,
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
    const data = await category.findOne({
      where : {
        id: id
      }
    })
    if(!data){
      return null
    }
    await category.destroy({
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

module.exports = CategoryController;