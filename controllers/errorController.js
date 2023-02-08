const CONFIG = require("../config/config");

function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(err.statusCode).json({
      status: 500,
      message: "Something Bad went Wrong",
    });
  }
}

module.exports = (err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (CONFIG.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (CONFIG.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: errr.stack,
  });
  next();
};
