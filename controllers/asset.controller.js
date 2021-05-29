const { UniqueConstraintError } = require('sequelize');
const { asset } = require('../models');
const Controller = require('../core/controller');

class AssetController extends Controller {
  get() {
    return this.sendResponse({ message: 'success save  data' });
  }

  async create() {
    const validate = this.validate(['id', 'email', 'name', 'categoryId', 'image', 'basePrice', 'isSold', 'endedAt', 'createdAt', 'updatedAt']);
    if (validate) {
      const {
        id, email, name, categoryId, image, basePrice, isSold, endedAt, createdAt, updatedAt
      } = validate;

      try {
        const user = await asset.create({
          id, email, name, categoryId, image, basePrice, isSold, endedAt, createdAt, updatedAt
        });
        return this.sendResponse({
          id: asset.id,
          email: asset.email, 
          name: asset.email,
          categoryId: asset.categoryId,
          image: asset.image,
          basePrice: asset.basePrice,
          isSold: asset.isSold,
          endedAt: asset.endedAt,
          createdAt: asset.createAt,
          updatedAt: asset.updatedAt
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
    const validate = this.validate(['id', 'email', 'name', 'categoryId', 'image', 'basePrice', 'isSold', 'endedAt', 'createdAt', 'updatedAt']);

    if (validate) {
      const {
        id, email, name, categoryId, image, basePrice, isSold, endedAt, createdAt, updatedAt
      } = validate;

      try {
        await asset.update({
          id, email, name, categoryId, image, basePrice, isSold, endedAt, createdAt, updatedAt
        }, {
          where: { email },
        });

        return this.sendResponse({
          id, 
          email, 
          name, 
          categoryId, 
          image, 
          basePrice, 
          isSold, 
          endedAt,
          createdAt,
          updatedAt
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
    const data = await asset.findOne({
      where : {
        id: id
      }
    })
    if(!data){
      return null
    }
    await asset.destroy({
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

module.exports = AssetController;