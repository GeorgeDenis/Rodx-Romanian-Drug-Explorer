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
const getConfiscariFavorite = catchAsync(async (req, res) => {
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
  const confiscari = await filters.getAllConfiscariFilter(decoded.email);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: confiscari }));
});
const getInfractiuniFavorite = catchAsync(async (req, res) => {
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
  const infractiuni = await filters.getAllInfractiuniFilter(decoded.email);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: infractiuni }));
});
const getUrgenteFavorite = catchAsync(async (req, res) => {
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
  const infractiuni = await filters.getAllUrgenteFilter(decoded.email);
  res.statusCode = 200;
  res.end(JSON.stringify({ data: infractiuni }));
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
getUrgenteFavorite;
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

const saveConfiscariFilter = catchAsync(async (req, res) => {
  const filter = await parseRequestBody(req);
  if (!filter) {
    return errorController(
      res,
      new AppError("Introduceti un filtru valid!", 400)
    );
  }
  if (
    !filter.categorie_select ||
    !filter.reprezentare ||
    !filter.confiscari_subcategorie ||
    !filter.startYearConfiscari ||
    !filter.endYearConfiscari ||
    !filter.drog
  ) {
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
  const result = await filters.addConfiscariFilter(filter, decoded.email);
  if (result === null) {
    return errorController(res, new AppError("Filtrul exista deja!", 400));
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Filtrul a fost adăugat cu succes" }));
});

const saveInfractiuniFilter = catchAsync(async (req, res) => {
  const filter = await parseRequestBody(req);
  if (!filter) {
    return errorController(
      res,
      new AppError("Introduceti un filtru valid!", 400)
    );
  }
  if (
    !filter.categorie_select ||
    !filter.reprezentare ||
    !filter.infractiuni_categorie ||
    !filter.startYearInfractiuni ||
    !filter.endYearInfractiuni
  ) {
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
  const result = await filters.addInfractiuniFilter(filter, decoded.email);
  if (result === null) {
    return errorController(res, new AppError("Filtrul exista deja!", 400));
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Filtrul a fost adăugat cu succes" }));
});

const saveUrgenteFilter = catchAsync(async (req, res) => {
  const filter = await parseRequestBody(req);
  if (!filter) {
    return errorController(
      res,
      new AppError("Introduceti un filtru valid!", 400)
    );
  }
  if (
    !filter.categorie_select ||
    !filter.reprezentare ||
    !filter.urgente_drog ||
    !filter.urgente_filtru
  ) {
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
  const result = await filters.addUrgenteFiltru(filter, decoded.email);
  if (result === null) {
    return errorController(res, new AppError("Filtrul exista deja!", 400));
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Filtrul a fost adăugat cu succes" }));
});

const deleteConfiscariFilter = catchAsync(async (req, res) => {
  const filterId = req.url.split("/")[5];

  if (!filterId) {
    return errorController(
      res,
      new AppError("Trebuie sa introduceti un id de filtru valid!", 400)
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
        "Trebuie sa fiti autentificat pentru a sterge un filtru!",
        401
      )
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const result = await filters.deleteConfiscariFilter(filterId, decoded.email);
  if (result === null) {
    return errorController(res, new AppError("Filtrul nu exista!", 400));
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Filtrul a fost sters cu succes" }));
});
const deleteUrgenteFilter = catchAsync(async (req, res) => {
  const filterId = req.url.split("/")[5];

  if (!filterId) {
    return errorController(
      res,
      new AppError("Trebuie sa introduceti un id de filtru valid!", 400)
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
        "Trebuie sa fiti autentificat pentru a sterge un filtru!",
        401
      )
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const result = await filters.deleteUrgenteFilter(filterId, decoded.email);
  if (result === null) {
    return errorController(res, new AppError("Filtrul nu exista!", 400));
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Filtrul a fost sters cu succes" }));
});
const deleteInfractiuniFilter = catchAsync(async (req, res) => {
  const filterId = req.url.split("/")[5];

  if (!filterId) {
    return errorController(
      res,
      new AppError("Trebuie sa introduceti un id de filtru valid!", 400)
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
        "Trebuie sa fiti autentificat pentru a sterge un filtru!",
        401
      )
    );
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const result = await filters.deleteInfractiuniFilter(filterId, decoded.email);
  if (result === null) {
    return errorController(res, new AppError("Filtrul nu exista!", 400));
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Filtrul a fost sters cu succes" }));
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
  } else if (url === "/api/filter/confiscari/favorite" && method === "POST") {
    saveConfiscariFilter(req, res);
  } else if (url === "/api/filter/confiscari/favorite" && method === "GET") {
    getConfiscariFavorite(req, res);
  } else if (
    url.match(/^\/api\/filter\/confiscari\/favorite\/(\d+)$/) &&
    method === "DELETE"
  ) {
    deleteConfiscariFilter(req, res);
  } else if (url === "/api/filter/urgente/favorite" && method === "POST") {
    saveUrgenteFilter(req, res);
  } else if (url === "/api/filter/urgente/favorite" && method === "GET") {
    getUrgenteFavorite(req, res);
  } else if (
    url.match(/^\/api\/filter\/urgente\/favorite\/(\d+)$/) &&
    method === "DELETE"
  ) {
    deleteUrgenteFilter(req, res);
  } else if (url === "/api/filter/infractiuni/favorite" && method === "POST") {
    saveInfractiuniFilter(req, res);
  } else if (url === "/api/filter/infractiuni/favorite" && method === "GET") {
    getInfractiuniFavorite(req, res);
  } else if (url === "/api/filter/infractiuni/interval" && method === "POST") {
    getInfractiuniInterval(req, res);
  } else if (
    url.match(/^\/api\/filter\/infractiuni\/favorite\/(\d+)$/) &&
    method === "DELETE"
  ) {
    deleteInfractiuniFilter(req, res);
  }
});
module.exports = filterController;
