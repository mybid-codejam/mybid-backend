import { Router as expressRouter } from 'express';
import HomeController from '../controllers/home.controller';

export default class Route {
  constructor() {
    this.router = expressRouter();
  }

  init() {
    return [
      this.get('/', (req, res) => new HomeController(req, res).getHome()),
    ];
  }

  get(path, ...handlers) {
    return this.router.get(path, handlers);
  }
}
