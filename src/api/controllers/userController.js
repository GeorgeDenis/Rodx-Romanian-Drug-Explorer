require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("../controllers/errorController");
const catchAsync = require("../utils/catchAsync");
const { verifyToken, verifyRole } = require("../controllers/authController");
const user = require("../model/user");

const getAllUsers = catchAsync(async (req, res) => {
  const result = await user.getAllUsers();
  res.statusCode = 200;
  res.end(JSON.stringify({ data: result }));
});

const createUser = catchAsync(async (userData) => {
  const newUser = await user.createUser(userData);
  return newUser;
});

const userController = catchAsync(async (req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");
  if (url === "/api/users" && method === "GET") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    if (!verifyRole(res, response, "admin")) {
      return;
    }
    getAllUsers(req, res);
  } else if (url === "/api/users" && method === "POST") {
    createUser(req, res);
  }
});
module.exports = userController;
