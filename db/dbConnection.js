const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const CONFIG = require("../config/config");
const MONGODB_URL = CONFIG.MONGODB_URL;
function connectToDb() {
  mongoose.connect(MONGODB_URL);
  mongoose.connection.on("connected", () => {
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  });
  mongoose.connection.on("error", (err) => {
    console.log("UNABLE TO CONNECT TO MONGODB");
  });
}

module.exports = connectToDb;
