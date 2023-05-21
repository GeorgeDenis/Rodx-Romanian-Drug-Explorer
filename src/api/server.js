const http = require("http");
const apiRequest = require("./controllers/controller");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url.startsWith("/api")) {
    apiRequest(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
