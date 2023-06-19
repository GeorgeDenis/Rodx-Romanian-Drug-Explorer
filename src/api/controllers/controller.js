const errorController = require("./errorController");
const { authController } = require("./authController");
const userController = require("./userController");
const adminController = require("./adminController");
const filterController = require("./filterController");
const AppError = require("../utils/appError");
const campaignController = require("./campaignController");


const apiRequest = (req, res) => {
  const url = req.url;
  if (url.startsWith("/api/auth")) {
    authController(req, res);
  } else if (url.startsWith("/api/users")) {
    userController(req, res);
  } else if (url.startsWith("/api/admin")) {
    adminController(req, res);
  } else if (url.startsWith("/api/filter")) {
    filterController(req, res);
  }  else if (url.startsWith("/api/campaign")) {
    campaignController(req, res);
  } 
  else {
    errorController(res, new AppError("Not found", 404));
  }
};
module.exports = apiRequest;
