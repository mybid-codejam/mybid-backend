const firebase = require('firebase-admin');
const fs = require('fs/promises');
const { Asset, Transaction, Category } = require('../models');
const { AssetCollection, TransactionCollection } = require('../collections');
const Controller = require('../core/controller');
const ResponseError = require('../exceptions/response.error');

class AssetController extends Controller {
  async getAll() {
    const assets = await Asset.findAll();
    const data = await AssetCollection.toArray(assets);

    return this.sendResponse(data);
  }

  async get() {
    const { id } = this.req.params;
    const asset = await Asset.findOne({ where: { id } });
    const data = await AssetCollection.toDetail(asset);

    return this.sendResponse(data);
  }

  // *Middleware Auth
  async create() {
    const userId = this.res.locals.user.id;
    const validate = this.validate(['name', 'categoryId', 'description', 'document', 'location', 'basePrice', 'endedAt']);
    if (validate) {
      const {
        name, categoryId, basePrice, endedAt, description, document, location,
      } = validate;

      // check category
      const category = await Category.findOne({ where: { id: categoryId } });
      if (category === null) {
        throw new ResponseError('Category not found', 404);
      }

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

      const asset = await Asset.create({
        userId, name, categoryId, images: JSON.stringify(images), basePrice, endedAt, description, document, location,
      });

      const data = await AssetCollection.toJSON(asset);
      return this.sendResponse(data, 'Success add asset', 201);
    }

    return null;
  }

  // *Middleware Auth
  async update() {
    const { id } = this.req.params;
    const validate = this.validate(['name', 'categoryId', 'description', 'document', 'location', 'endedAt']);

    if (validate) {
      const {
        name, categoryId, description, location, endedAt,
      } = validate;

      const asset = await Asset.findOne({ where: { id } });
      if (asset === null) {
        throw new ResponseError('Asset not found', 404);
      }

      asset.name = name;
      asset.categoryId = categoryId;
      asset.description = description;
      asset.location = location;
      asset.endedAt = endedAt;
      asset.save();

      const data = await AssetCollection.toJSON(asset);
      return this.sendResponse(data, 'Success update asset');
    }

    return null;
  }

  // *Middleware Auth
  async updateBid() {
    const { id } = this.req.params;
    const userId = this.res.locals.user.id;
    const validate = this.validate(['bid']);

    if (validate) {
      const { bid } = validate;
      const asset = await Asset.findOne({ where: { id } });
      if (asset === null) {
        throw new ResponseError('Asset not found', 404);
      }
      // check if bid greater then base price
      if (bid < asset.basePrice) {
        throw new ResponseError('Bid must be greater then asset base price', 400);
      }

      const transaction = await Transaction.create({
        assetId: id,
        userId,
        bidPrice: bid,
      });

      const data = await TransactionCollection.toJson(transaction);
      return this.sendResponse(data, 'Success bid asset', 201);
    }

    return null;
  }
}

module.exports = AssetController;
