const http = require("http");
const apiRequest = require("./controllers/controller");
const handleViewRequest = require("./controllers/pagesController");
const rssController = require("./controllers/rssController");

const da = require("./utils/generateToken");
const rateLimitWindowTimeInMillis = 60000;
const maxRequestsPerWindow = 500;
const requestsLog = new Map();

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }
  const currentTime = Date.now();
  const clientIp = req.socket.remoteAddress;

  const requests = requestsLog.get(clientIp) || [];
  const requestsInWindow = requests.filter(
    (time) => currentTime - time < rateLimitWindowTimeInMillis
  );

  if (requestsInWindow.length >= maxRequestsPerWindow) {
    res.writeHead(429, { "Content-Type": "text/plain" });
    res.end("Too many requests, please try again later.");
  } else {
    requests.push(currentTime);
    requestsLog.set(clientIp, requests);

    const url = req.url;
    if (url.startsWith("/api")) {
      apiRequest(req, res);
    } else if (url.startsWith("/rss")) {
      rssController(req, res);
    } else {
      handleViewRequest(req, res);
    }
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
