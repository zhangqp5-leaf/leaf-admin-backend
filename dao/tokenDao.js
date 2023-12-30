
let mysqlPool = require('../config/config');
let sql = require('./tokenSqlMapping');
let { successResponse, failResponse } = require('../utils/const');
let jsonWebToken = require('jsonwebtoken')

module.exports = {
  getToken: function(req, res, next) {
    const {username, password} = req.body;
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
                  expiresIn: "3 days",
                }),
              },
            };
            res.status(200).send(ret);
          } else {
            ret = {
              ...failResponse,
              message: 'Invalid username or password',
            };
            res.status(500).send(ret);
          }
          mysqlPool.release(conn);
        }
      );
    })
    .catch(err=> {
      console.log(err);
    });
  },
};
