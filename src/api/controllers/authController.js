require("dotenv").config();
const AppError = require("../utils/appError");
const errorController = require("../controllers/errorController");
const parseRequestBody = require("../utils/parseReq");
const catchAsync = require("../utils/catchAsync");
const users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const fetch = require("node-fetch");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Înregistrează un utilizator nou.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Utilizator înregistrat cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 * /api/auth/login:
 *   post:
 *     summary: Autentifică un utilizator existent.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Autentificare reușită.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 * /api/auth/changePassword:
 *   post:
 *     summary: Schimbă parola unui utilizator autentificat.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Parola a fost schimbată cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 * /api/auth/changeAccount:
 *   post:
 *     summary: Modifică detaliile contului unui utilizator autentificat.
 *     tags: [Authentication]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *               newEmail:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datele contului au fost schimbate cu succes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 */
const generateToken = catchAsync(async (user) => {
  const response = await fetch("http://localhost:5000/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `sharedKey=${process.env.SHARED_KEY}&name=${user.name}&role=${user.role}&email=${user.email}`,
  });

  if (!response.ok) {
    throw new Error("Failed to generate token");
  }

  const data = await response.json();

  return data.token;
});

const verifyToken = catchAsync(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token || token === "null") {
    errorController(
      res,
      new AppError(
        "Nu sunteti autentificat! Va rugam sa va autentificati!",
        401
      )
    );
    return null;
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const freshUser = await users.findUserByUser(decoded.name);
  if (!freshUser) {
    errorController(res, new AppError("Acest utilizator nu mai exista!", 401));
    return null;
  }
  req.currentToken = decoded;
  return decoded;
});

const verifyRole = (res, response, ...roles) => {
  if (!roles.includes(response.role)) {
    errorController(res, new AppError("Nu ai permisiunea sa faci asta!", 403));
    return false;
  }
  return true;
};

const permission = catchAsync(async (req, res) => {
  const response = await verifyToken(req, res);
  if (!response) {
    return;
  }
  if (!verifyRole(res, response, "admin")) {
    return;
  }
});

const signup = catchAsync(async (req, res) => {
  const user = await parseRequestBody(req);
  if (!user) {
    errorController(
      res,
      new AppError("Va rog sa introduceti un utilizator", 400)
    );
  }
  if (!user.name || !user.email || !user.password) {
    errorController(
      res,
      new AppError("Trebuie sa introduceti toate datele!", 400)
    );
  }
  if (user.role) {
    errorController(res, new AppError("Nu va puteti seta singur rolul!", 400));
    return;
  }
  if (await users.checkUsername(user.name)) {
    errorController(res, new AppError("Numele exista deja!", 400));
    return;
  }
  if (await users.checkEmail(user.email)) {
    errorController(res, new AppError("Email-ul exista deja!", 400));
    return;
  }
  user.role = "user";
  user.password = await bcrypt.hash(user.password, 10);
  const result = await users.createUser(user);
  let token = await generateToken(user);

  const response = {
    status: "success",
    data: {
      token,
    },
  };

  res.statusCode = 201;
  res.end(JSON.stringify(response));
});

const login = catchAsync(async (req, res) => {
  const { email, password } = await parseRequestBody(req);

  if (!email || !password) {
    errorController(
      res,
      new AppError("Introduceti toate campurile necesare", 400)
    );
  }

  const user = await users.findUserByEmail(email);
  if (!user) {
    errorController(res, new AppError("Email-ul nu exista!", 401));
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    errorController(res, new AppError("Parola incorecta", 401));
    return;
  }

  const token = await generateToken(user);

  const response = {
    status: "success",
    data: {
      token,
    },
  };

  res.statusCode = 200;
  res.end(JSON.stringify(response));
});

const changePassword = catchAsync(async (req, res) => {
  const request = await parseRequestBody(req);
  const { oldPassword, newPassword } = request;

  const user = await users.findUserByUser(req.currentToken.name);
  const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordCorrect) {
    errorController(res, new AppError("Parola veche este incorectă", 401));
    return;
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  await users.updateUserPassword(req.currentToken.name, newHashedPassword);

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "success",
      message: "Parola a fost schimbată cu succes",
    })
  );
});

const changeAccount = catchAsync(async (req, res) => {
  const request = await parseRequestBody(req);

  const user = await users.findUserByUser(req.currentToken.name);

  const newName =
    request.newName && request.newName.trim() !== ""
      ? request.newName
      : user.name;
  const newEmail =
    request.newEmail && request.newEmail.trim() !== ""
      ? request.newEmail
      : user.email;

  if (newName !== user.name && (await users.checkUsername(newName))) {
    errorController(
      res,
      new AppError("Numele de utilizator este deja folosit", 400)
    );
    return;
  }

  if (newEmail !== user.email && (await users.checkEmail(newEmail))) {
    errorController(
      res,
      new AppError("Adresa de e-mail este deja folosită", 400)
    );
    return;
  }

  await users.updateUserAccount(
    req.currentToken.name,
    req.currentToken.email,
    newName,
    newEmail
  );
  user.name = newName;
  user.email = newEmail;

  const token = await generateToken(user);

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "success",
      message: "Datele contului au fost schimbate cu succes",
      token,
    })
  );
});
/////

const resetPasswordRequest = catchAsync(async (req, res) => {
  const { email } = await parseRequestBody(req);
  const user = await users.findUserByEmail(email);
  if (!user) {
    errorController(res, new AppError("Email-ul nu exista!", 401));
    return;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetExpires = new Date();
  resetExpires.setHours(resetExpires.getHours() + 1);

  await users.setUserResetToken(user.email, resetToken, resetExpires);

  const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreply.ip.b4@gmail.com",
      pass: "fzgmsukprrcyficq",
    },
  });

  let mailOptions = {
    from: '"Rodx" <your-email@example.com>',
    to: user.email,
    subject: "Resetare parola",
    html: `Vă rugăm să <a href="${resetUrl}">accesați acest link</a> pentru a vă reseta parola.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "success",
      message: "Un e-mail a fost trimis cu instrucțiuni de resetare a parolei.",
    })
  );
});

const resetPassword = catchAsync(async (req, res) => {
  const resetToken = req.url.split("/")[4];

  const user = await users.findUserByResetToken(resetToken);

  if (!user) {
    errorController(res, new AppError("Token-ul nu există sau a expirat", 401));
    return;
  }

  const resetExpires = new Date(user.reset_token_expires);
  if (resetExpires < new Date()) {
    errorController(res, new AppError("Token-ul a expirat", 401));
    return;
  }

  const { password } = await parseRequestBody(req);
  const hashedPassword = await bcrypt.hash(password, 12);

  await users.updateUserPasswordbyEmail(user.email, hashedPassword);
  await users.clearUserResetToken(user.email);

  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "success",
      message: "Parola a fost resetată cu succes.",
    })
  );
});

const authController = catchAsync(async (req, res) => {
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");

  if (url === "/api/auth/signup" && method === "POST") {
    signup(req, res);
  } else if (url === "/api/auth/login" && method === "POST") {
    login(req, res);
  } else if (url === "/api/auth/changePassword" && method === "POST") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    changePassword(req, res);
  } else if (url === "/api/auth/changeAccount" && method === "POST") {
    const response = await verifyToken(req, res);
    if (!response) {
      return;
    }
    changeAccount(req, res);
  } else if (url === "/api/auth/resetPasswordRequest" && method === "POST") {
    resetPasswordRequest(req, res);
  } else if (url.startsWith("/api/auth/resetPassword/") && method === "POST") {
    resetPassword(req, res);
  }
});

module.exports = { authController, verifyToken, verifyRole, permission };
