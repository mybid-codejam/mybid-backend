const asyncHandler = require('express-async-handler');
const multer = require('multer');
const { Router } = require('express');
const {
  HomeController,
  UserController,
  CartController,
  CategoryController,
  AssetController,
  PaymentController,
  TransactionController,
} = require('../controllers');
const ResponseError = require('../exceptions/response.error');
const Middleware = require('../middlewares/middleware');

class Route {
  constructor() {
    this.router = Router();
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        cb(null, `${Date.now()} - ${file.originalname}`);
      },
    });
    this.upload = multer({ storage });
  }

  init() {
    return [
      this.get('/', (req, res) => new HomeController(req, res).getHome()),

      this.post('/register', (req, res) => new UserController(req, res).register()),
      this.post('/login', (req, res) => new UserController(req, res).login()),
      this.patch('/profile', (req, res) => new UserController(req, res).update(), [Middleware.auth]),

      this.get('/cart', (req, res) => new CartController(req, res).get()),
      this.post('/cart', (req, res) => new CartController(req, res).create()),
      this.patch('/cart', (req, res) => new CartController(req, res).update()),

      this.get('/category', (req, res) => new CategoryController(req, res).getAll()),
      this.post('/category', (req, res) => new CategoryController(req, res).create()),
      this.patch('/category/:id', (req, res) => new CategoryController(req, res).update()),
      this.delete('/category/:id', (req, res) => new CategoryController(req, res).delete()),

      this.get('/asset', (req, res) => new AssetController(req, res).get()),
      this.post('/asset', (req, res) => new AssetController(req, res).create(), [Middleware.auth, this.upload.array('images', 4)]),
      this.patch('/asset', (req, res) => new AssetController(req, res).update()),

      this.get('/payment', (req, res) => new PaymentController(req, res).get()),
      this.post('/payment', (req, res) => new PaymentController(req, res).create()),
      this.patch('/payment', (req, res) => new PaymentController(req, res).update()),

      this.get('/transaction', (req, res) => new TransactionController(req, res).get()),
      this.post('/transaction', (req, res) => new TransactionController(req, res).create()),
      this.patch('/transaction', (req, res) => new TransactionController(req, res).update()),

      // *handle error
      // eslint-disable-next-line no-unused-vars
      this.router.use((err, req, res, next) => {
        if (err instanceof ResponseError) {
          return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: null,
          });
        }

        return res.status(500).json({
          success: false,
          message: err.message,
          data: null,
        });
      }),

      // *handle not found
      // eslint-disable-next-line arrow-body-style
      this.router.use('*', (req, res) => {
        return res.status(400).json({
          success: false,
          message: 'Endpoint not found',
          data: null,
        });
      }),
    ];
  }

  get(path, handlers) {
    return this.router.get(path, asyncHandler(handlers));
  }

  post(path, handlers, middleware) {
    if (middleware === undefined) {
      return this.router.post(path, asyncHandler(handlers));
    }

    return this.router.post(path, middleware, asyncHandler(handlers));
  }

  patch(path, handlers, middleware) {
    if (middleware === undefined) {
      return this.router.patch(path, asyncHandler(handlers));
    }

    return this.router.patch(path, middleware, asyncHandler(handlers));
  }

  delete(path, handlers) {
    return this.router.delete(path, asyncHandler(handlers));
  }
}

module.exports = Route;
