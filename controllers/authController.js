const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const userDetails = req.body;
  const newUser = await User.create(userDetails);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
