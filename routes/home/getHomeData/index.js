var express = require('express');
var router = express.Router();
const { successResponse, failResponse } = require('../../../utils/const');
const homeInfo = require('./data');

router.get('/home/info', function(req, res, next) {
  try {
    res.status(200).send({
      ...successResponse,
      data: homeInfo,
    });
  } catch (error) {
    res.status(500).send({
      ...failResponse,
      msg: '请求数据失败，请检查网络',
    });
  }
});

module.exports = router;
