const Controller = require('../core/controller');

class HomeController extends Controller {
  getHome() {
    return this.res.send('MyBid API');
  }
}

module.exports = HomeController;
