const app = require("./app");

const CONFIG = require("./config/config");

const connectToDb = require("./db/dbConnection");

connectToDb();

const port = CONFIG.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is listening from port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection... Server is shutting down");
  server.close(() => {
    process.exit(1);
  });
});
