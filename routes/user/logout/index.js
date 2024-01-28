const express = require('express')
const router = express.Router()

// 退出登录
router.post('/admin/base/comm/logout', function (req, res, next) {
  res.clearCookie('username');
  res.clearCookie('role');
  res.jsonSuccess({});
});

module.exports = router;
