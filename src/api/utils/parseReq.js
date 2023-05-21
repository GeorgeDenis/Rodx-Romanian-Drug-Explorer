function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (body) {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      } else {
        resolve({});
      }
    });
  });
}
module.exports = parseRequestBody;
