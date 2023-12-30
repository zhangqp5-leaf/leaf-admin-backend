const express = require('express')
const router = express.Router()
const svgCaptcha = require("svg-captcha");
let { successResponse, failResponse } = require('../../utils/const');

function createCode() {
    return svgCaptcha.create({
        size: 4,
        ignoreChars: "0o1iIl",
        noise: 3,
        color: true,
        background: "#fff",
        fontSize: 60
    });
}
console.log(3);

// 生成验证码接口
router.get('/admin/base/open/captcha', function (req, res, next) {
  console.log(1);
  let code = createCode();
  console.log({code});
  res.type('svg');
  req.session = code.text.toLowerCase();
  // cookie放一份
  res.cookie('captcha', req.session);

  const ret = {
    ...successResponse,
    data: code.data,
  };
  console.log({ret});
  res.status(200).send(ret);
});

module.exports = router;
