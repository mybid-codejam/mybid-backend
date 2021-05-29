class ResponseError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
  }
}

ResponseError.prototype = Object.create(Error.prototype);

module.exports = ResponseError;
