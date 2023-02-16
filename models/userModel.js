const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email address"],
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
  },
});

module.exports = mongoose.model("User", userSchema);