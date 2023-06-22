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
  const ext = path.extname(filePath);

  try {

    const data = await fs.readFile(filePath);
    res.setHeader("Content-Type", mimeTypes[ext] || "text/plain");
    res.end(data);
  } catch (err) {
    if (err.code === "ENOENT") {
        const errorData = await fs.readFile("./view/404.html");
        res.setHeader("Content-Type", "text/html");
        res.statusCode = 404;
        res.end(errorData);
       
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
  } else if (url === "/forgot") {
    filePath = "./view/forgot.html";
  }else if (url === "/cautare") {
    filePath = "./view/cautare.html";
  } else if (url === "/about") {
    filePath = "./view/about.html";
  } else if (url === "/droguri") {
    filePath = "./view/droguri.html";
  } else if (url === "/myaccount") {
    filePath = "./view/myaccount.html";
  } else if (url === "/alcool") {
    filePath = "./view/Droguri/Alcool.html";
  } else if (url === "/marijuana") {
    filePath = "./view/Droguri/Marijuana.html";
  } else if (url === "/ciuperca") {
    filePath = "./view/Droguri/Ciupearca.html";
  } else if (url === "/lsd") {
    filePath = "./view/Droguri/LSD.html";
  } else if (url === "/cocaina") {
    filePath = "./view/Droguri/Cocaina.html";
  } else if (url === "/heroina") {
    filePath = "./view/Droguri/Heroina.html";
  } else if (url === "/ecstasy") {
    filePath = "./view/Droguri/Ecstasy.html";
  } else if (url === "/opium") {
    filePath = "./view/Droguri/Opium.html";
  } else if (url === "/metamfetamina") {
    filePath = "./view/Droguri/Metamfetamina.html";
  } else if (url === "/fenciclidina") {
    filePath = "./view/Droguri/Fenciclidina.html";
  } else if (url.startsWith("/resetPassword")) {
    filePath = "./view/resetPassword.html";
  }  else {
    filePath = path.resolve("." + req.url);
  }
  respondFile(req, res, filePath);
};

module.exports = handleViewRequest;
