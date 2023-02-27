const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Authentication

userRouter.route("/signup").post(authController.signup);
userRouter.route("/login").post(authController.login);

userRouter.param("id", userController.checkID);

// USER ROUTES

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
