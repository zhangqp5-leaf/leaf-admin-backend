let sql = require('./tokenSqlMapping');
let jsonWebToken = require('jsonwebtoken')
const { redisClient } = require('../config/config');

module.exports = {
  getToken: async (req, res, next) => {
    const {username, password, verifyCode, captchaId} = req.body;
    // 验证验证码
    const storedCode = await redisClient.get(captchaId);
    if (!storedCode) {
      res.jsonFail(500, '验证码已过期');
      return;
    } else if (storedCode === verifyCode) {
      console.log('Verification code is valid');
    } else if (storedCode !== verifyCode) {
      res.jsonFail(500, '验证码输入错误');
      return;
    }
    const con = req.mysqlConnection;
    const [results] = await con.promise().query(sql.login, [username, password]);
    if (results.length > 0) {
      console.log('results', results);
      res.cookie('username', username);
      res.cookie('role', results[0].role);
      res.clearCookie('captcha');
      res.jsonSuccess({
        data: results[0],
        token: jsonWebToken.sign({
          username: username,
          role: results[0].role,
        }, global.servers.SECRET_KEY, {
          expiresIn: "8h",
        }),
      });
    } else {
      res.jsonFail(500, '用户名或密码错误');
    }
  },
};
