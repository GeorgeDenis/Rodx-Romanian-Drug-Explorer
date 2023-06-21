require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("../controllers/errorController");
const parseRequestBody = require("../utils/parseReq");
const catchAsync = require("../utils/catchAsync");
const users = require("../model/user");
const bcrypt = require("bcrypt");
const { verifyToken, verifyRole } = require("./authController");

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Obțineți toți utilizatorii.
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de utilizatori
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       401:
 *         description: Nu sunteti autorizat.
 *       403:
 *         description: Nu aveti permisiunea de a efectua aceasta actiune.
 * 
 *   delete:
 *     summary: Șterge un utilizator pe baza adresei de email.
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       204:
 *         description: Utilizator șters cu succes.
 *       400:
 *         description: Email-ul introdus nu exista.
 *       401:
 *         description: Nu sunteti autorizat.
 *       403:
 *         description: Nu aveti permisiunea de a efectua aceasta actiune.
 *       500:
 *         description: A aparut o problema la stergerea utilizatorului.
 */
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
  } else if (url.startsWith("/api/admin") && method === "DELETE") {
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
