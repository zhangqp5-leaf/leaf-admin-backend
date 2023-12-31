const express = require('express')
const router = express.Router()
let { successResponse, failResponse } = require('../../utils/const');

// 退出登录
router.post('/admin/base/comm/logout', function (req, res, next) {
  res.clearCookie('username');
  res.clearCookie('role');
  const ret = {
    ...successResponse,
  };
  res.status(200).send(ret);
});

module.exports = router;
