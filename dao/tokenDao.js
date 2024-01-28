
let mysqlPool = require('../config/config');
let sql = require('./tokenSqlMapping');
let jsonWebToken = require('jsonwebtoken')

module.exports = {
  getToken: async (req, res, next) => {
    const {username, password, verifyCode} = req.body;
    if (req.cookies.captcha.toLowerCase() !== verifyCode.toLowerCase()) {
      res.jsonFail(500, '验证码输入错误')
      return;
    }
    const conn = await mysqlPool.acquire();
    const [results] = await conn.promise().query(sql.login, [username, password]);
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
    mysqlPool.release(conn);
  },
};
