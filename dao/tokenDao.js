
let mysqlPool = require('../config/config');
let sql = require('./tokenSqlMapping');
let { successResponse, failResponse } = require('../utils/const');
let jsonWebToken = require('jsonwebtoken')

module.exports = {
  getToken: function(req, res, next) {
    const {username, password, verifyCode} = req.body;
    if (req.cookies.captcha.toLowerCase() !== verifyCode.toLowerCase()) {
      let ret = {
        ...failResponse,
        message: '验证码输入错误',
      };
      res.status(500).send(ret);
      return;
    }
    mysqlPool.acquire().then(conn => {
      conn.query(sql.login, [username, password], (error, results, fields) => {
          if (error) throw error;
          let ret;
          if (results.length > 0) {
            console.log('results', results);
            ret = {
              ...successResponse,
              data: {
                data: results[0],
                token: jsonWebToken.sign({
                  username: username,
                  role: results[0].role,
                }, global.servers.SECRET_KEY, {
                  expiresIn: "12h",
                }),
              },
            };
            res.cookie('username', username);
            res.cookie('role', results[0].role);
            res.clearCookie('captcha');
            res.status(200).send(ret);
          } else {
            ret = {
              ...failResponse,
              message: '用户名或密码错误',
            };
            res.status(500).send(ret);
          }
        }
      );
      mysqlPool.release(conn);
    })
    .catch(err=> {
      console.log(err);
    });
  },
};
