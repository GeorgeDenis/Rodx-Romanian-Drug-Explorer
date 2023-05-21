const errorController = (res, err) => {
  res.statusCode = err.statusCode;
  res.end(err.message);
};

module.exports = errorController;
