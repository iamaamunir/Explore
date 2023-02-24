require("dotenv").config();

const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN
};

module.exports = CONFIG;
