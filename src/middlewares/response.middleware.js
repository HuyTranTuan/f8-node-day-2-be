const response = (_, res, next) => {
  res.success = (data, status = 200) => {
    res.status(status).json({
      message: "Success",
      data,
    });
  };

  res.error = (error, status = 500) => {
    res.status(status).json({
      message: "Error",
      error,
    });
  };

  next();
};

module.exports = response;
