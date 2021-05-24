const { UniqueConstraintError } = require('sequelize');
const { User } = require('../models');
const Controller = require('../core/controller');

class UserController extends Controller {
  get() {
    return this.sendResponse({ message: 'success save  data' });
  }

  async create() {
    const validate = this.validate(['email', 'password', 'firstName', 'lastName', 'address', 'type']);

    if (validate) {
      const {
        email, password, firstName, lastName, address, type,
      } = validate;

      try {
        const user = await User.create({
          email, password, firstName, lastName, address, type,
        });
        return this.sendResponse({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          type: user.type,
          typeDescription: (user.type === 1) ? 'Penjual' : 'Pembeli',
          createdAt: user.createdAt,
        }, 'Success register', 201);
      } catch (e) {
        if (e instanceof UniqueConstraintError) {
          return this.sendResponse(null, 'Email already used', 400);
        }
        return this.sendResponse(null, 'Failed', 400);
      }
    }

    return null;
  }

  async update() {
    const { email } = this.req.params;
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
