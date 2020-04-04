const { isEmpty } = require('ramda');
const { httpCodes } = require('./http');

/**
 * ApiError base class
 */
class ApiError extends Error {
  constructor(message, payload, httpCode) {
    super();
    this.message = message;
    this.payload = payload;
    this.httpCode = httpCode;
    this.apiError = true;
  }
}

/**
 * HTTP 404 NotFound Error class
 */
class NotFoundError extends ApiError {
  constructor(payload = {}, message = 'Not Found') {
    super(message, payload, httpCodes.NOT_FOUND);
  }
}

/**
 * HTTP 400 BadRequest Error class
 */
class BadRequestError extends ApiError {
  constructor(payload = {}, message = 'Bad Request') {
    super(message, payload, httpCodes.BAD_REQUEST);
  }
}

/**
 * HTTP 401 UnauthorizedError Error class
 */
class UnauthorizedError extends ApiError {
  constructor(payload = {}, message = 'Unauthorized') {
    super(message, payload, httpCodes.UNAUTHORIZED);
  }
}

/**
 * HTTP 500 InternalError Error class
 */
class InternalError extends ApiError {
  constructor(payload = {}, message = 'Internal Server Error') {
    super(message, payload, httpCodes.INTERNAL_ERROR);
  }
}

const formatResponseError = (err, env) => {
  let errorObject;
  if (err instanceof ApiError || err.apiError) {
    errorObject = err;
  } else {
    // otherwise we return HTTP 500 error
    errorObject = new InternalError();
  }
  // prepare response error
  const responseError = {
    error: errorObject.message,
    code: errorObject.httpCode,
  };
  if (!isEmpty(errorObject.payload)) {
    responseError.payload = errorObject.payload;
  }
  // check if error stack should be exposed
  if (env.NODE_ENV !== 'production') {
    responseError.stacktrace = err.stacktrace || err.stack;
  }
  return responseError;
};

module.exports = {
  ApiError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalError,
  formatResponseError,
};
