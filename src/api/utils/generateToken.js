require("dotenv").config();
const http = require("http");
const url = require("url");
const querystring = require("querystring");
const jwt = require("jsonwebtoken");

const generateToken = (name, role, email) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    name: name,
    role: role,
    email: email,
  };
  let options = {
    expiresIn: process.env.EXPIRATION,
  };
  const token = jwt.sign(data, jwtSecretKey, options);
  return token;
};

http
  .createServer((req, res) => {
    const urlParts = url.parse(req.url, true);
    if (req.method === "POST" && urlParts.pathname === "/token") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const data = querystring.parse(body);
        if (data.sharedKey !== process.env.SHARED_KEY) {
          res.writeHead(403);
          return res.end("Forbidden");
        }

        const token = generateToken(data.name, data.role, data.email);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ token }));
      });
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(5000, () => {
    console.log(`JWT Generator service is running on port 5000`);
  });
