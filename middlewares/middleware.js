const { User } = require('../models');

class Middleware {
  static async auth(req, res, next) {
    const { authorization } = req.headers;
    if (authorization) {
      const apiToken = authorization.split(' ')[1];
      const user = await User.findOne({ where: { apiToken } });
      if (user !== null) {
        res.locals.user = user.dataValues;

        return next();
      }
    }

    return res.status(403).json({
      success: false,
      message: 'Forbidden',
      data: null,
    });
  }
}

module.exports = Middleware;
