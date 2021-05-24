import Controller from '../core/controller';

export default class HomeController extends Controller {
  getHome() {
    return this.res.send('Hello World');
  }
}
