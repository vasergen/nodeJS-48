function logRequest(req, res, next) {
  console.log("Got request", req.method, req.path);
  next();
}

module.exports = { logRequest };
