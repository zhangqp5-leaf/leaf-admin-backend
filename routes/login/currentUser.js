const express = require('express')
const router = express.Router()
let mysqlPool = require('../../config/config');
let { successResponse, failResponse } = require('../../utils/const');

// 获取当前登录用户
router.get('/admin/base/open/currentUser', async (req, res, next) => {
  const username = req.cookies.username;
  const conn = await mysqlPool.acquire();
  const [results] = await conn.promise().query('SELECT * FROM `users` WHERE username = ?', [username]);
  const ret = {
    ...successResponse,
    data: results[0],
  };
  res.status(200).send(ret);
  mysqlPool.release(conn);
});

module.exports = router;
