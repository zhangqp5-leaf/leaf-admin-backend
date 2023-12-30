const express = require('express')
const router = express.Router()

const token = require('../../dao/tokenDao');

// 登录接口
router.post('/admin/base/open/login', function (req, res, next) {
  token.getToken(req, res, next);
})

module.exports = router