class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  console.log(err);
  const { statusCode, message } = err;
  res.status(statusCode).json([
    {
      code: statusCode,
      message,
    },
  ]);
};

module.exports = {
  ErrorHandler,
  handleError,
};
