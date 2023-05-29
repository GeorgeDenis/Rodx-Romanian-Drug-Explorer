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

// const generateToken = (name, role, email) => {
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;
//   let data = {
//     name: name,
//     role: role,
//     email: email,
//   };
//   let options = {
//     expiresIn: process.env.EXPIRATION,
//   };
//   const token = jwt.sign(data, jwtSecretKey, options);
//   return token;
// };

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
  if (!token) {
    errorController(
      res,
      new AppError("You are not logged in! Please log in!", 401)
    );
    return null;
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const freshUser = await users.findUserByUser(decoded.name);
  if (!freshUser) {
    errorController(res, new AppError("The user does not longer exists!", 401));
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
    errorController(res, new AppError("Email sau parola incorecte", 401));
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    errorController(res, new AppError("Parola incorecta", 401));
    return;
  }
  //let token = generateToken(user.name, user.role, user.email);

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

const authController = catchAsync(async (req, res) => {
  const { method, url } = req;
  res.setHeader("Content-Type", "application/json");
  if (url === "/api/auth/signup" && method === "POST") {
    signup(req, res);
  } else if (url === "/api/auth/login" && method === "POST") {
    login(req, res);
  }
});

module.exports = { authController, verifyToken, verifyRole, permission };
