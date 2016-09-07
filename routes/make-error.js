function makeError(res, message, status) {
  res.statusCode = status;
  // var error = new Error(message);
  var error = {
    status: status,
    message: message
  };
  return error;
}

module.exports = makeError;
