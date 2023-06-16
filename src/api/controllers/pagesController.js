const fs = require("fs").promises;
const path = require("path");
const { verifyToken } = require("../controllers/authController");

const mimeTypes = {
  ".js": "application/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".json": "application/json",
  ".txt": "text/plain",
  ".gif": "image/gif",
};

const respondFile = async (req, res, filePath) => {
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.setHeader("Content-Type", mimeTypes[ext] || "text/plain");
    res.end(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.statusCode = 404;
      res.end("Not Found");
    } else {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
};

const handleViewRequest = (req, res) => {
  let filePath;
  const { method, url } = req;
  if (url === "/acasa" || url === "/") {
    filePath = "./view/index.html";
  } else if (url === "/campanii") {
    filePath = "./view/campanii.html";
  } else if (url === "/login") {
    filePath = "./view/login.html";
  } else if (url === "/cautare") {
    filePath = "./view/cautare.html";
  } else if (url === "/about") {
    filePath = "./view/about.html";
  } else if (url === "/droguri") {
    filePath = "./view/droguri.html";
  } else if (url === "/myaccount") {
    filePath = "./view/myaccount.html";
  } else {
    filePath = path.resolve("." + req.url);
  }
  respondFile(req, res, filePath);
};

module.exports = handleViewRequest;
