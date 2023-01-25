const express = require("express");
const morgan = require("morgan");
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

module.exports = app;
