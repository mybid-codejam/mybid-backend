const md5 = require('md5');
const firebase = require('firebase-admin');
const fs = require('fs/promises');
const Controller = require('../core/controller');
const ResponseError = require('../exceptions/response.error');
const { User } = require('../models');
const { UserCollection } = require('../collections');

class UserController extends Controller {
  async register() {
    const validate = this.validate(['fullName', 'email', 'password', 'category']);

    if (validate) {
      const {
        fullName, email, password, category,
      } = validate;

      // check if email exist or not
      const checkUser = await User.findOne({ where: { email } });
      if (checkUser !== null) {
        throw new ResponseError('Email already used', 400);
      }

      const user = await User.create({
        fullName, email, password: md5(password), category,
      });

      const data = UserCollection.toJson(user);
      return this.sendResponse(data, 'Success register', 201);
    }

    return null;
  }

  async login() {
    const validate = this.validate(['email', 'password']);
    if (validate) {
      const { email, password } = validate;
      const user = await User.findOne({ where: { email, password: md5(password) } });

      if (user === null) {
        throw new ResponseError('User not found or wrong email/password', 404);
      }

      // update api token and last login
      const apiToken = md5(Date.now());
      const lastLogin = new Date().toISOString();
      user.apiToken = apiToken;
      user.lastLogin = lastLogin;
      user.save();

      const data = UserCollection.toJson(user);
      return this.sendResponse(data, 'Success login');
    }
    return null;
  }

  // *Middleware Auth
  async get() {
    const { email } = this.res.locals.user;
    const user = await User.findOne({ where: { email } });

    const data = await UserCollection.toDetail(user);
    return this.sendResponse(data);
  }

  // *Middleware Auth
  async updatePhoto() {
    const { file } = this.req;
    if (file === undefined) {
      throw new ResponseError('Field photoProfile are required', 422);
    }

    const { email } = this.res.locals.user;
    const storage = firebase.storage();
    const bucket = storage.bucket();

    const { path, filename } = file;
    const imageUrl = `https://storage.googleapis.com/mybid-e8958.appspot.com/${filename}`;
    await bucket.upload(path, { // upload file
      resumable: true,
      predefinedAcl: 'publicRead',
    });
    await fs.unlink(path); // delete temp file

    const user = await User.findOne({ where: { email } });
    user.photoProfile = imageUrl;
    user.save();

    const data = UserCollection.toDetail(user);
    return this.sendResponse(data, 'Success update profile');
  }

  // *Middleware Auth
  async updateAccount() {
    const { email } = this.res.locals.user;
    const validate = this.validate([
      'fullName', 'phoneNumber',
    ]);

    if (validate) {
      const { fullName, phoneNumber } = validate;

      const user = await User.findOne({ where: { email } });
      user.fullName = fullName;
      user.phoneNumber = phoneNumber;
      user.save();

      const data = UserCollection.toDetail(user);
      return this.sendResponse(data, 'Success update profile');
    }

    return null;
  }

  // *Middleware Auth
  async updateInfo() {
    const { email } = this.res.locals.user;
    const validate = this.validate([
      'idCardNumber', 'gender', 'bornDate', 'bornPlace', 'address', 'rw', 'rt', 'kelurahan', 'kecamatan',
    ]);

    if (validate) {
      const {
        idCardNumber, gender, bornDate, bornPlace, address, rw, rt, kelurahan, kecamatan,
      } = validate;

      const user = await User.findOne({ where: { email } });
      user.idCardNumber = idCardNumber;
      user.gender = gender;
      user.bornDate = bornDate;
      user.bornPlace = bornPlace;
      user.address = address;
      user.rw = rw;
      user.rt = rt;
      user.kelurahan = kelurahan;
      user.kecamatan = kecamatan;
      user.save();

      const data = UserCollection.toDetail(user);
      return this.sendResponse(data, 'Success update profile');
    }

    return null;
  }
}

module.exports = UserController;
