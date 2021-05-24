const { Router } = require('express');
const { HomeController, UserController } = require('../controllers');

class Route {
  constructor() {
    this.router = Router();
  }

  init() {
    return [
      this.get('/', (req, res) => new HomeController(req, res).getHome()),
      this.get('/user', (req, res) => new UserController(req, res).createUser()),
    ];
  }

  get(path, ...handlers) {
    return this.router.get(path, handlers);
  }
}

module.exports = Route;
