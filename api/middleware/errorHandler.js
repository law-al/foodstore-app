const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server Error",
    stackTrace: err.stack,
  });
};

module.exports = errorHandler;
