const md5 = require('md5');
const { UniqueConstraintError } = require('sequelize');
const { User } = require('../models');
const Controller = require('../core/controller');
const ResponseError = require('../exceptions/response.error');

class UserController extends Controller {
  async register() {
    const validate = this.validate(['email', 'password', 'firstName', 'lastName', 'address']);

    if (validate) {
      try {
        const {
          email, password, firstName, lastName, address,
        } = validate;

        const user = await User.create({
          email, password: md5(password), firstName, lastName, address,
        });

        return this.sendResponse({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          createdAt: user.createdAt,
        }, 'Success register', 201);
      } catch (e) {
        if (e instanceof UniqueConstraintError) {
          throw new ResponseError('Email already used', 400);
        }
      }
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

      return this.sendResponse({
        email, apiToken, lastLogin,
      }, 'Success login');
    }
    return null;
  }

  async update() {
    const { email } = this.res.locals.user;
    const validate = this.validate(['firstName', 'lastName', 'address']);

    if (validate) {
      const {
        firstName, lastName, address,
      } = validate;

      try {
        await User.update({
          firstName, lastName, address,
        }, {
          where: { email },
        });

        return this.sendResponse({
          email,
          firstName,
          lastName,
          address,
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
}

module.exports = UserController;
