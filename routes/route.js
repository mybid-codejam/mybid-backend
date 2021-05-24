const { Router } = require('express');
const { HomeController, UserController } = require('../controllers');

class Route {
  constructor() {
    this.router = Router();
  }

  init() {
    return [
      this.get('/', (req, res) => new HomeController(req, res).getHome()),
      this.get('/user', (req, res) => new UserController(req, res).get()),
      this.post('/user', (req, res) => new UserController(req, res).create()),
      this.put('/user/:email', (req, res) => new UserController(req, res).update()),
    ];
  }

  get(path, ...handlers) {
    return this.router.get(path, handlers);
  }

  post(path, ...handlers) {
    return this.router.post(path, handlers);
  }

  put(path, ...handlers) {
    return this.router.put(path, handlers);
  }

  delete(path, ...handlers) {
    return this.router.delete(path, handlers);
  }
}

module.exports = Route;
