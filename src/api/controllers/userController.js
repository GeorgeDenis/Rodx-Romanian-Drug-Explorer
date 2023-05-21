require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("../controllers/errorController");
const parseRequestBody = require("../utils/parseReq");
const catchAsync = require("../utils/catchAsync");
const { verifyToken } = require("../controllers/authController");
const user = require("../model/user");
const jwt = require("jsonwebtoken");
const util = require("util");

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
    const logUser = await verifyToken(req, res);
    if (!logUser) {
      return;
    }

    getAllUsers(req, res);
  } else if (url === "/api/users" && method === "POST") {
    createUser(req, res);
  }
});
module.exports = userController;
