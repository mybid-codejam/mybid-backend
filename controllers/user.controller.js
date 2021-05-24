const Controller = require('../core/controller');
const { User } = require('../models');

class UserController extends Controller {
  createUser() {
    User.create({
      email: 'asd',
    });

    return this.sendResponse({ message: 'success save  data' });
  }
}

module.exports = UserController;
