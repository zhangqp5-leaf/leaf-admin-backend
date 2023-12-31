const express = require('express')
const router = express.Router()
const svgCaptcha = require("svg-captcha");
let { successResponse, failResponse } = require('../../utils/const');

// 生成验证码接口
router.get('/admin/base/open/captcha', function (req, res, next) {
  let code = svgCaptcha.create();
  res.type('svg');
  req.session = code.text.toLowerCase();
  // cookie放一份
  res.cookie('captcha', req.session);

  const ret = {
    ...successResponse,
    data: code.data,
  };
  res.status(200).send(ret);
});

module.exports = router;
