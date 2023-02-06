const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const CONFIG = require("./config/config");
const NODE_ENV = CONFIG.NODE_ENV;
const app = express();
app.use(express.json());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(`${__dirname}/public`));

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const date = new Date();

app.use((req, res, next) => {
  req.requestTime = date.toLocaleDateString("en-us", options);
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//  Handling routes without handlers
app.all("*", (req, res, next) => {
  next(new AppError(`Can't access ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
});

module.exports = app;
