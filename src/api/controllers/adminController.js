require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("../controllers/errorController");
const parseRequestBody = require("../utils/parseReq");
const catchAsync = require("../utils/catchAsync");
const users = require("../model/user");
const bcrypt = require("bcrypt");
const { verifyToken, verifyRole } = require("./authController");

const permission = catchAsync(async (req, res) => {
  const response = await verifyToken(req, res);
  if (!response) {
    return;
  }
  if (!verifyRole(res, response, "admin")) {
    return;
  }
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await users.getAllUsers();
  res.statusCode = 200;
  res.end(JSON.stringify({ data: result }));
});

const deleteUser = catchAsync(async (req, res) => {
  const request = await parseRequestBody(req);
  if (!request) {
    errorController(
      res,
      new AppError(
        "Va rog sa introduceti adresa de email a utilizatorului pe care doriti sa-l stergeti",
        400
      )
    );
  }
  if (!(await users.checkEmail(request.email))) {
    errorController(
      res,
      new AppError("Nu exista un utilizator cu acest email!", 400)
    );
    return;
  }
  const deletionSuccess = await users.deleteUser(request.email);
  if (deletionSuccess) {
    res.statusCode = 204;
    res.end();
  } else {
    errorController(
      res,
      new AppError("A aparut o problema la stergerea utilizatorului!", 500)
    );
    return;
  }
});

const adminController = catchAsync(async (req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");
  if (url === "/api/admin" && method === "GET") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    if (!verifyRole(res, response, "admin")) {
      return;
    }
    getAllUsers(req, res);
  } else if (url === "/api/admin" && method === "DELETE") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    if (!verifyRole(res, response, "admin")) {
      return;
    }
    deleteUser(req, res);
  }
});
module.exports = adminController;
