const CONFIG = require("../config/config");
const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate Field Error:${err.keyValue.name}`;
  return new AppError(message, 400);
};

const handleValidationDB = (err) => {
  const path = Object.values(err.errors).map((el) => el.path);
  const value = Object.values(err.errors).map((el) => el.value);
  const message = `Invalid Data Input at fields: ${path} with values:${value} respectively`;
  return new AppError(message, 400);
};

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
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (CONFIG.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (CONFIG.NODE_ENV === "production") {
    let error = { ...err };
    if (error.path === "_id") {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message === "Validation failed")
      error = handleValidationDB(error);
    sendErrorProd(error, res);
  }

  // res.status(err.statusCode).json({
  //   status: err.status,
  //   message: err.message,
  //   error: err,
  //   stack: err.stack,
  // });
};
