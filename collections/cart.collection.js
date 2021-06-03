const AssetCollection = require('./asset.collection');
const { dateTimeFormat, currencyFormat } = require('../helper/helper');
const { Asset } = require('../models');

class CartCollection {
  static async toArray(carts) {
    const data = [];
    for (let i = 0; i < carts.length; i++) {
      const asset = await Asset.findOne({ where: { id: carts[i].assetId } });
      data.push({
        id: carts[i].id,
        asset: {
          id: asset.id,
          name: asset.name,
          location: asset.location,
          basePrice: asset.basePrice,
          basePriceDesc: currencyFormat(asset.basePrice),
          thumb: encodeURI(JSON.parse(asset.images)[0]),
          endedAt: asset.endedAt,
          endedAtDesc: dateTimeFormat(asset.endedAt),
        },
        createdAt: carts[i].createdAt,
        createdAtDesc: dateTimeFormat(carts[i].createdAt),
        updatedAt: carts[i].updatedAt,
        updatedAtDesc: dateTimeFormat(carts[i].updatedAt),
      });
    }

    return data;
  }

  static async toJSON(cart) {
    const asset = await Asset.findOne({ where: { id: cart.assetId } });
    return {
      id: cart.id,
      asset: await AssetCollection.toJSON(asset),
      createdAt: cart.createdAt,
      createdAtDesc: dateTimeFormat(cart.createdAt),
      updatedAt: cart.updatedAt,
      updatedAtDesc: dateTimeFormat(cart.updatedAt),
    };
  }
}

module.exports = CartCollection;
