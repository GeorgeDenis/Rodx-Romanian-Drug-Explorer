require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("./errorController");
const parseRequestBody = require("../utils/parseReq");
const catchAsync = require("../utils/catchAsync");
const { verifyToken } = require("./authController");
const filters = require("../model/filter");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

/**
 * @swagger
 * /api/filter/urgente:
 *   post:
 *     summary: Obține informații despre urgente.
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               urgente_an:
 *                 type: string
 *                 description: Anul pentru urgenta.
 *               urgente_drog:
 *                 type: string
 *                 description: Drogul pentru urgenta.
 *               urgente_filtru:
 *                 type: string
 *                 description: Filtrul pentru urgenta.
 *     responses:
 *       200:
 *         description: Operațiunea a fost finalizată cu succes. Se întoarce lista cu urgente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       urgente_an:
 *                         type: string
 *                       urgente_drog:
 *                         type: string
 *                       urgente_filtru:
 *                         type: string
 *       400:
 *         description: Cerește datele pentru filtru sau introducere anul și drogul.

 * /api/filter/confiscari/interval:
 *   post:
 *     summary: Obține informații despre confiscări într-un interval specificat.
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confiscari_subcategorie:
 *                 type: string
 *                 description: Subcategoria pentru confiscare.
 *               drog:
 *                 type: string
 *                 description: Drogul pentru confiscare.
 *               endYearConfiscari:
 *                 type: string
 *                 description: Anul de sfârșit pentru intervalul de confiscări.
 *               startYearConfiscari:
 *                 type: string
 *                 description: Anul de start pentru intervalul de confiscări.
 *     responses:
 *       200:
 *         description: Operațiunea a fost finalizată cu succes. Se întoarce lista cu confiscări.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       confiscari_subcategorie:
 *                         type: string
 *                       drog:
 *                         type: string
 *                       endYearConfiscari:
 *                         type: string
 *                       startYearConfiscari:
 *                         type: string
 *       400:
 *         description: Cerește datele pentru filtru sau introducere anul și drogul.

 * /api/filter/urgente/interval:
 *   post:
 *     summary: Obține informații despre urgente într-un interval specificat.
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               endYear:
 *                 type: string
 *                 description: Anul de sfârșit pentru intervalul de urgențe.
 *               gen_filtru:
 *                 type: string
 *                 description: Genul pentru filtrul de urgențe.
 *               startYear:
 *                 type: string
 *                 description: Anul de start pentru intervalul de urgențe.
 *               urgente_an:
 *                 type: string
 *                 description: Anul pentru urgenta.
 *               urgente_drog:
 *                 type: string
 *                 description: Drogul pentru urgenta.
 *               urgente_filtru:
 *                 type: string
 *                 description: Filtrul pentru urgenta.
 *     responses:
 *       200:
 *         description: Operațiunea a fost finalizată cu succes. Se întoarce lista cu urgente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       endYear:
 *                         type: string
 *                       gen_filtru:
 *                         type: string
 *                       startYear:
 *                         type: string
 *                       urgente_an:
 *                         type: string
 *                       urgente_drog:
 *                         type: string
 *                       urgente_filtru:
 *                         type: string
 *       400:
 *         description: Cerește datele pentru filtru sau introducere anul și drogul.
 * /api/filter/infractiuni/interval:
 *   post:
 *     summary: Obține informații despre infracțiuni într-un interval specificat.
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               endYearInfractiuni:
 *                 type: string
 *                 description: Anul de sfârșit pentru intervalul de infracțiuni.
 *               incadrare_filtru_infractiuni:
 *                 type: string
 *                 description: Incadrarea juridica pentru filtrul de infracțiuni.
 *               infractiuni_categorie:
 *                 type: string
 *                 description: Categoria infracțiunii.
 *               startYearInfractiuni:
 *                 type: string
 *                 description: Anul de start pentru intervalul de infracțiuni.
 *     responses:
 *       200:
 *         description: Operațiunea a fost finalizată cu succes. Se întoarce lista cu infracțiuni.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       endYearInfractiuni:
 *                         type: string
 *                       incadrare_filtru_infractiuni:
 *                         type: string
 *                       infractiuni_categorie:
 *                         type: string
 *                       startYearInfractiuni:
 *                         type: string
 *       400:
 *         description: Cerește datele pentru filtru sau introducere anul și drogul.
 */  


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
const getConfiscariInterval = catchAsync(async (req, res) => {
  const intervalData = await parseRequestBody(req);
  if (!intervalData) {
    return errorController(
      res,
      new AppError("Introduceti datele pentru filtru!", 400)
    );
  }
  const confiscari = await filters.getConfiscariIntervalBd(intervalData);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: confiscari }));
});
const getInfractiuniInterval = catchAsync(async (req, res) => {
  const intervalData = await parseRequestBody(req);
  if (!intervalData) {
    return errorController(
      res,
      new AppError("Introduceti datele pentru filtru!", 400)
    );
  }
  const infractiuni = await filters.getInfractiuniIntervalBd(intervalData);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: infractiuni }));
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
  } else if (url === "/api/filter/urgente" && method === "POST") {
    getUrgente(req, res);
  } else if (url === "/api/filter/confiscari/interval" && method === "POST") {
    getConfiscariInterval(req, res);
  } else if (url === "/api/filter/infractiuni/interval" && method === "POST") {
    getInfractiuniInterval(req, res);
  } else if (url === "/api/filter" && method === "POST") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    saveFilter(req, res);
  }
});
module.exports = filterController;
