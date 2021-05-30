const md5 = require('md5');
const { User } = require('../models');
const Controller = require('../core/controller');
const ResponseError = require('../exceptions/response.error');
const { UserCollection } = require('../collections');

class UserController extends Controller {
  async register() {
    const validate = this.validate(['email', 'password', 'firstName', 'lastName', 'address']);

    if (validate) {
      const {
        email, password, firstName, lastName, address,
      } = validate;

      // check if email exist or not
      const checkUser = await User.findOne({ where: { email } });
      if (checkUser !== null) {
        throw new ResponseError('Email already used', 400);
      }

      const user = await User.create({
        email, password: md5(password), firstName, lastName, address,
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
  async update() {
    const { email } = this.res.locals.user;
    const validate = this.validate(['firstName', 'lastName', 'address']);

    if (validate) {
      const {
        firstName, lastName, address,
      } = validate;

      const user = await User.findOne({ where: { email } });
      user.firstName = firstName;
      user.lastName = lastName;
      user.address = address;
      user.save();

      const data = UserCollection.toJson(user);
      return this.sendResponse(data, 'Success update profile');
    }

    return null;
  }
}

module.exports = UserController;
