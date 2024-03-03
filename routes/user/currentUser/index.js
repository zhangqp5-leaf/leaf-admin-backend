const express = require('express')
const router = express.Router()

// 获取当前登录用户
router.get('/admin/base/open/currentUser', async (req, res, next) => {
  const username = req.cookies.username;
  const con = req.mysqlConnection;
  const [results] = await con.promise().query('SELECT * FROM `users` WHERE username = ?', [username]);
  res.jsonSuccess(results[0]);
});

module.exports = router;
