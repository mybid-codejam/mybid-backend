const TransactionCollection = require('./transaction.collection');
const { currencyFormat, dateFormat, dateTimeFormat } = require('../helper/helper');
const { Category, User, Transaction } = require('../models');

class AssetCollection {
  static async toArray(assets) {
    const data = [];
    for (let i = 0; i < assets.length; i++) {
      const category = await Category.findOne({ where: { id: assets[i].categoryId } });
      data.push({
        id: assets[i].id,
        isSold: assets[i].isSold,
        location: assets[i].location,
        basePrice: parseInt(assets[i].basePrice, 10),
        basePriceDesc: currencyFormat(assets[i].basePrice),
        category,
        thumb: encodeURI(JSON.parse(assets[i].images)[0]),
        endedAt: assets[i].endedAt,
        endedAtDesc: dateFormat(assets[i].endedAt),
        createdAt: assets[i].createdAt,
        createdAtDesc: dateTimeFormat(assets[i].createdAt),
        updatedAt: assets[i].updatedAt,
        updatedAtDesc: dateTimeFormat(assets[i].updatedAt),
      });
    }

    return data;
  }

  static async toJSON(asset) {
    const category = await Category.findOne({ where: { id: asset.categoryId } });
    return {
      id: asset.id,
      name: asset.name,
      description: asset.description,
      document: asset.document,
      isSold: asset.isSold,
      location: asset.location,
      basePrice: parseInt(asset.basePrice, 10),
      basePriceDesc: currencyFormat(asset.basePrice),
      category,
      images: JSON.parse(asset.images).map((val) => encodeURI(val)),
      endedAt: asset.endedAt,
      endedAtDesc: dateFormat(asset.endedAt),
      createdAt: asset.createdAt,
      createdAtDesc: dateTimeFormat(asset.createdAt),
      updatedAt: asset.updatedAt,
      updatedAtDesc: dateTimeFormat(asset.updatedAt),
    };
  }

  static async toDetail(asset) {
    const category = await Category.findOne({ where: { id: asset.categoryId } });
    const user = await User.findOne({ where: { id: asset.userId } });
    const transactions = await Transaction.findAll({ where: { assetId: asset.id } });
    const transactionsData = await TransactionCollection.toArrayInAsset(transactions);

    return {
      id: asset.id,
      name: asset.name,
      description: asset.description,
      document: asset.document,
      isSold: asset.isSold,
      location: asset.location,
      basePrice: parseInt(asset.basePrice, 10),
      basePriceDesc: currencyFormat(asset.basePrice),
      category,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      images: JSON.parse(asset.images).map((val) => encodeURI(val)),
      endedAt: asset.endedAt,
      endedAtDesc: dateFormat(asset.endedAt),
      createdAt: asset.createdAt,
      createdAtDesc: dateTimeFormat(asset.createdAt),
      updatedAt: asset.updatedAt,
      updatedAtDesc: dateTimeFormat(asset.updatedAt),
      transactions: transactionsData,
    };
  }
}

module.exports = AssetCollection;
