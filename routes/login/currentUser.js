const express = require('express')
const router = express.Router()
let { successResponse, failResponse } = require('../../utils/const');

// 获取当前登录用户
router.get('/admin/base/open/currentUser', function (req, res, next) {
  const ret = {
    ...successResponse,
    data: {
      username: req.cookies.username,
      role: req.cookies.role,
    },
  };
  res.status(200).send(ret);
});

module.exports = router;
