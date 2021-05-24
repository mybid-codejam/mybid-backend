class Controller {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  /**
   * @param {JSON} data
   * @param {number} statusCode
   * @returns Response send
   */
  sendResponse(data, statusCode = 200) {
    return this.res.json(data).status(statusCode);
  }
}

module.exports = Controller;
