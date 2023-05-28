const http = require("http");
const apiRequest = require("./controllers/controller");
const handleViewRequest = require("./controllers/pagesController");

const rateLimitWindowTimeInMillis = 60000;
const maxRequestsPerWindow = 500;
const requestsLog = new Map();

const server = http.createServer((req, res) => {
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
    } else {
      handleViewRequest(req, res);
    }
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
