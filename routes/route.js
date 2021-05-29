const { Router } = require('express');
const { HomeController, UserController, CartController, CategoryController, AssetController, PaymentController, TransactionController } = require('../controllers');

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
      this.get('/cart', (req, res) => new CartController(req, res).get()),
      this.post('/cart', (req, res) => new CartController(req, res).create()),
      this.put('/cart', (req, res) => new CartController(req, res).update()),
      this.get('/category', (req, res) => new CategoryController(req, res).get()),
      this.post('/category', (req, res) => new CategoryController(req, res).create()),
      this.put('/category', (req, res) => new CategoryController(req, res).update()),
      this.get('/asset', (req, res) => new AssetController(req, res).get()),
      this.post('/asset', (req, res) => new AssetController(req, res).create()),
      this.put('/asset', (req, res) => new AssetController(req, res).update()),
      this.get('/payment', (req, res) => new PaymentController(req, res).get()),
      this.post('/payment', (req, res) => new PaymentController(req, res).create()),
      this.put('/payment', (req, res) => new PaymentController(req, res).update()),
      this.get('/transaction', (req, res) => new TransactionController(req, res).get()),
      this.post('/transaction', (req, res) => new TransactionController(req, res).create()),
      this.put('/transaction', (req, res) => new TransactionController(req, res).update()),
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
