const { dateTimeFormat } = require('../helper/helper');

class UserCollection {
  static toJson(user) {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      apiToken: user.apiToken ?? null,
      lastLogin: user.lastLogin ?? null,
      lastLoginDesc: user.lastLogin ? dateTimeFormat(user.lastLogin) : null,
      createdAt: user.createdAt,
      createdAtDesc: dateTimeFormat(user.createdAt),
    };
  }
}

module.exports = UserCollection;
