const { snakeCaseToCamelCase } = require('../utils/utils');

// 格式化response
const formatResponse = (req, res, next) => {
  res.jsonSuccess = (data) => {
    res.status(200).json({
      code: 200,
      msg: 'success',
      data: snakeCaseToCamelCase(data),
    })
  };
  res.jsonFail = (code, message) => {
    res.status(code).json({
      code,
      msg: message,
    })
  };
  next();
};

module.exports = formatResponse;