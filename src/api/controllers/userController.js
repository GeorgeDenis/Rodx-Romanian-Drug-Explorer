require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("../controllers/errorController");
const catchAsync = require("../utils/catchAsync");
const { verifyToken, verifyRole } = require("../controllers/authController");
const user = require("../model/user");

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     description: Obține toți utilizatorii. Numește "admin".
 *     responses:
 *       200:
 *         description: Lista utilizatorilor.
 *       401:
 *         description: Autorizare necorespunzătoare.
 *       403:
 *         description: Acces neautorizat.
 *       500:
 *         description: Eroare de server.
 *   post:
 *     tags:
 *       - Users
 *     description: Creează un utilizator nou.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: ''
 *     responses:
 *       200:
 *         description: Utilizatorul a fost creat cu succes.
 *       400:
 *         description: Cerere incorectă.
 *       500:
 *         description: Eroare de server.
 *
 * /api/users/self:
 *   get:
 *     tags:
 *       - Users
 *     description: Obține informațiile utilizatorului curent.
 *     responses:
 *       200:
 *         description: Datele utilizatorului curent.
 *       401:
 *         description: Autorizare necorespunzătoare.
 *       404:
 *         description: Utilizatorul nu a fost găsit.
 *       500:
 *         description: Eroare de server.
 */

const getAllUsers = catchAsync(async (req, res) => {
  const result = await user.getAllUsers();
  res.statusCode = 200;
  res.end(JSON.stringify({ data: result }));
});

const createUser = catchAsync(async (userData) => {
  const newUser = await user.createUser(userData);
  return newUser;
});

const getSelf = async (req, res, email) => {
  try {
    const self = await user.findUserByEmail(email);

    if (!self) {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "User not found" }));
    } else {
      res.statusCode = 200;
      res.end(JSON.stringify({ data: self }));
    }
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
};

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
  } else if (url === "/api/users/self" && method === "GET") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    getSelf(req, res, response.email);
  }
});
module.exports = userController;
