const express = require('express')
const router = express.Router()
let mysqlPool = require('../../../config/config');

// 获取当前登录用户
router.get('/admin/base/open/currentUser', async (req, res, next) => {
  const username = req.cookies.username;
  const conn = await mysqlPool.acquire();
  const [results] = await conn.promise().query('SELECT * FROM `users` WHERE username = ?', [username]);
  res.jsonSuccess(results[0]);
  mysqlPool.release(conn);
});

module.exports = router;
