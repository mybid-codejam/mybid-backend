const { UniqueConstraintError } = require('sequelize');
const firebase = require('firebase-admin');
const fs = require('fs/promises');
const { Asset } = require('../models');
const Controller = require('../core/controller');
const ResponseError = require('../exceptions/response.error');

class AssetController extends Controller {
  get() {
    return this.sendResponse({ message: 'success save  data' });
  }

  async create() {
    const { email } = this.res.locals.user;
    const validate = this.validate(['name', 'categoryId', 'description', 'document', 'basePrice', 'endedAt']);
    if (validate) {
      const { files } = this.req;
      // validate file is image
      for (let i = 0; i < files.length; i++) {
        const { mimetype } = files[i];
        const type = mimetype.split('/')[0];
        if (type !== 'image') {
          throw new ResponseError('Only image', 400);
        }
      }

      const storage = firebase.storage();
      const bucket = storage.bucket();
      const images = [];
      for (let i = 0; i < files.length; i++) {
        const { path, filename } = files[i];
        const imageUrl = `https://storage.googleapis.com/mybid-e8958.appspot.com/${filename}`;
        await bucket.upload(path, { // upload file
          resumable: true,
          predefinedAcl: 'publicRead',
        });
        images.push(imageUrl);

        await fs.unlink(path); // delete temp file
      }

      const {
        name, categoryId, basePrice, endedAt, description, document,
      } = validate;

      const asset = await Asset.create({
        email, name, categoryId, images: JSON.stringify(images), basePrice, endedAt, description, document,
      });

      return this.sendResponse({
        email,
        name: asset.name,
        categoryId: asset.categoryId,
        images,
        basePrice: asset.basePrice,
        description: asset.description,
        document: asset.document,
        isSold: asset.isSold,
        endedAt: asset.endedAt,
        createdAt: asset.createdAt,
        updatedAt: asset.updatedAt,
      }, 'Success register', 201);
    }

    return null;
  }

  async update() {
    const { id } = this.req.params;
    const validate = this.validate(['email', 'name', 'categoryId', 'image', 'basePrice', 'isSold', 'endedAt']);

    if (validate) {
      const {
        email, name, categoryId, image, basePrice, isSold, endedAt,
      } = validate;

      try {
        await Asset.update({
          email, name, categoryId, image, basePrice, isSold, endedAt,
        }, {
          where: { id },
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
      const data = await Asset.findOne({
        where: { id },
      });

      if (!data) {
        return null;
      }

      await Asset.destroy({
        where: { id },
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

module.exports = AssetController;
