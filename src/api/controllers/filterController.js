require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("./errorController");
const parseRequestBody = require("../utils/parseReq");
const catchAsync = require("../utils/catchAsync");
const { verifyToken } = require("./authController");
const filters = require("../model/filter");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const getUrgente = catchAsync(async (req, res) => {
  const urgenteData = await parseRequestBody(req);
  if (!urgenteData) {
    return errorController(
      res,
      new AppError("Introduceti datele pentru filtru!", 400)
    );
  }
  if (!urgenteData.urgente_an || !urgenteData.urgente_drog) {
    return errorController(
      res,
      new AppError("Trebuie sa introduceti anul si drogul!", 400)
    );
  }
  const urgente = await filters.getUrgenteByFilter(urgenteData);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: urgente }));
});
const getUrgenteInterval = catchAsync(async (req, res) => {
  const urgenteData = await parseRequestBody(req);
  if (!urgenteData) {
    return errorController(
      res,
      new AppError("Introduceti datele pentru filtru!", 400)
    );
  }
  const urgente = await filters.getUrgenteIntervalBd(urgenteData);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: urgente }));
});
const saveFilter = catchAsync(async (req, res) => {
  const filter = await parseRequestBody(req);
  if (!filter) {
    return errorController(
      res,
      new AppError("Introduceti un filtru valid!", 400)
    );
  }
  if (!filter.categorie || !filter.an || !filter.tip || !filter.reprezentare) {
    return errorController(
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
    return errorController(
      res,
      new AppError(
        "Trebuie sa fiti autentificat pentru a salvat un filtru!",
        401
      )
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  if (filter.categorie === "infractiuni") {
    const result = await filters.addInfractiuniFilter(filter, decoded.email);
    if (result === null) {
      return errorController(res, new AppError("Filtrul exista deja!", 400));
    }
  } else if (filter.categorie === "confiscari") {
    const result = await filters.addConfiscariFilter(filter, decoded.email);
    if (result === null) {
      return errorController(res, new AppError("Filtrul exista deja!", 400));
    }
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Filtrul a fost adăugat cu succes" }));
});

const filterController = catchAsync(async (req, res) => {
  const { url, method } = req;
  res.setHeader("Content-Type", "application/json");
  if (url === "/api/filter/urgente/interval" && method === "POST") {
    getUrgenteInterval(req, res);
  }
  if (url === "/api/filter/urgente" && method === "POST") {
    getUrgente(req, res);
  } else if (url === "/api/filter" && method === "POST") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    saveFilter(req, res);
  }
});
module.exports = filterController;
