module.exports = (res, err) => {
  res.statusCode = err.statusCode || 500;
  res.end(
    JSON.stringify({
      status: err.status,
      message: err.message,
    })
  );
};
