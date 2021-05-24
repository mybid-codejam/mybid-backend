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
   * validate request body
   * @param {Array} fields
   * @returns data or null
   */
  validate(fields) {
    let isValid = true;
    let data = null;

    for (let i = 0; i < fields.length; i++) {
      if (!this.req.body?.[fields[i]]) {
        isValid = false;
      } else {
        data = this.req.body;
      }
    }

    if (!isValid) {
      data = null;

      this.sendResponse(null, `Field ${fields.join(', ')} are required`, 422);
    }

    return data;
  }

  /**
   * @param {JSON} data
   * @param {number} statusCode
   * @returns Response send
   */
  sendResponse(data, message = 'Success', statusCode = 200) {
    return this.res.status(statusCode).json({
      success: statusCode >= 200 && statusCode < 300,
      message,
      data,
    });
  }
}

module.exports = Controller;
