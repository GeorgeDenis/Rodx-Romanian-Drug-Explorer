const catchAsync = require("../utils/catchAsync");
const { verifyToken, verifyRole } = require("../controllers/authController");
const { generateRSS } = require("../model/rss");
const getRSS = async (req, res) => {
  try {
    const rss = await generateRSS();
    res.setHeader("Content-Type", "application/rss+xml");
    res.end(rss);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Server error" }));
    console.error(err);
  }
};

const rssController = catchAsync(async (req, res) => {
  const { method, url } = req;
  if (url === "/rss" && method === "GET") {
    getRSS(req, res);
  }
});

module.exports = rssController;
