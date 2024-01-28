var express = require('express');
var router = express.Router();
const homeInfo = require('./data');

router.get('/home/info', function(req, res, next) {
  try {
    res.jsonSuccess(homeInfo);
  } catch (error) {
    res.jsonFail(500, '请求数据失败，请检查网络');
  }
});

module.exports = router;
