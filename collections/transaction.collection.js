const { dateTimeFormat, currencyFormat } = require('../helper/helper');
const { User, Asset } = require('../models');

class TransactionCollection {
  static async toJson(transaction) {
    const user = await User.findOne({ where: { id: transaction.userId } });
    const asset = await Asset.findOne({ where: { id: transaction.assetId } });

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      asset: {
        name: asset.name,
        basePrice: asset.basePrice,
        basePriceDesc: currencyFormat(asset.basePrice),
        endedAt: asset.endedAt,
        endedAtDesc: dateTimeFormat(asset.endedAt),
      },
      bidPrice: parseInt(transaction.bidPrice, 10),
      bidPriceDesc: currencyFormat(transaction.bidPrice),
      createdAt: transaction.createdAt,
      createdAtDesc: dateTimeFormat(transaction.createdAt),
      updatedAt: transaction.updatedAt,
      updatedAtDest: dateTimeFormat(transaction.updatedAt),
    };
  }

  static async toArrayInAsset(transactions) {
    const transactionsData = [];
    for (let i = 0; i < transactions.length; i++) {
      const transactionUser = await User.findOne({ where: { id: transactions[i].userId } });
      transactionsData.push({
        fullName: `${transactionUser.firstName} ${transactionUser.lastName}`,
        bidPrice: transactions[i].bidPrice,
        bidPriceDesc: currencyFormat(transactions[i].bidPrice),
        createdAt: transactions[i].createdAt,
        createdAtDesc: dateTimeFormat(transactions[i].createdAt),
        updatedAt: transactions[i].updatedAt,
        updatedAtDest: dateTimeFormat(transactions[i].updatedAt),
      });
    }

    return transactionsData;
  }
}

module.exports = TransactionCollection;
