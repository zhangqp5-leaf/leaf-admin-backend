const express = require('express')
const router = express.Router()
const svgCaptcha = require("svg-captcha");
const Snowflake = require('../../../utils/snowflake');
const { redisClient } = require('../../../config/config');

// 生成验证码接口
router.get('/admin/base/open/captcha', function (req, res, next) {
  // 创建一个 Snowflake 实例，机器 ID 设置为 1
  const snowflake = new Snowflake(1);

  // 生成唯一 ID 作为验证码标识
  const captchaId = snowflake.nextId();
  console.log('captchaId', captchaId);
  let code = svgCaptcha.create();
  res.type('svg');
  req.session = code.text.toLowerCase();
  // cookie放一份
  res.cookie('captcha', req.session);
  // 放入redis
  redisClient.set(captchaId, req.session, { EX: 300 });
  res.jsonSuccess({
    captchaId: captchaId,
    verifyCode: code.data,
  });
});

module.exports = router;
