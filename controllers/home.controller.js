const Controller = require('../core/controller');

class HomeController extends Controller {
  getHome() {
    return this.res.send('Hello World');
  }
}

module.exports = HomeController;
