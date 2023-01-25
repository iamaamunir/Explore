require("dotenv").config();

const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
};

module.exports = CONFIG;
