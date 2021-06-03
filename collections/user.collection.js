const { dateTimeFormat, toCapital } = require('../helper/helper');

class UserCollection {
  static toJson(user) {
    return {
      email: user.email,
      fullName: user.fullName,
      gender: toCapital(user.gender),
      category: toCapital(user.category),
      apiToken: user.apiToken ?? null,
      lastLogin: user.lastLogin ?? null,
      lastLoginDesc: user.lastLogin ? dateTimeFormat(user.lastLogin) : null,
      createdAt: user.createdAt,
      createdAtDesc: dateTimeFormat(user.createdAt),
    };
  }

  static toDetail(user) {
    return {
      email: user.email,
      fullName: user.fullName,
      bornDate: user.bornDate ?? null,
      bornPlace: user.bornPlace ?? null,
      photoProfile: user.photoProfile ? encodeURI(user.photoProfile) : null,
      phoneNumber: user.phoneNumber ?? null,
      idCardNumber: user.idCardNumber ?? null,
      gender: toCapital(user.gender),
      category: toCapital(user.category),
      address: user.address ?? null,
      rt: user.rt ?? null,
      rw: user.rw ?? null,
      kelurahan: user.kelurahan ?? null,
      kecamatan: user.kecamatan ?? null,
      apiToken: user.apiToken ?? null,
      lastLogin: user.lastLogin ?? null,
      lastLoginDesc: user.lastLogin ? dateTimeFormat(user.lastLogin) : null,
      createdAt: user.createdAt,
      createdAtDesc: dateTimeFormat(user.createdAt),
    };
  }
}

module.exports = UserCollection;
