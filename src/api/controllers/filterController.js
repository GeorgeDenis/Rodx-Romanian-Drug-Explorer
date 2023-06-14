require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("./errorController");
const parseRequestBody = require("../utils/parseReq");
const catchAsync = require("../utils/catchAsync");
const { verifyToken } = require("./authController");
const filters = require("../model/filter");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const saveFilter = catchAsync(async (req, res) => {
  const filter = await parseRequestBody(req);
  if (!filter) {
    errorController(res, new AppError("Introduceti un filtru valid!", 400));
    return;
  }
  if (
    !filter.confiscari_subcategorie ||
    !filter.confiscari_an ||
    !filter.tip ||
    !filter.reprezentare
  ) {
    errorController(
      res,
      new AppError("Trebuie sa introduceti toate datele!", 400)
    );
  }
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    errorController(
      res,
      new AppError(
        "Trebuie sa fiti autentificat pentru a salvat un filtru!",
        401
      )
    );
    return null;
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  if (filter.confiscari_subcategorie === "capturi") {
    const result = filters.addConfiscariFilter(filter, decoded.email);
    if (result === null) {
      errorController(res, new AppError("Filtrul exista deja!", 400));
      return null;
    }
  }
  res.statusCode = 204;
  res.end();
});

const filterController = catchAsync(async (req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");
  if (url === "/api/filter" && method === "POST") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    saveFilter(req, res);
  }
});
module.exports = filterController;
