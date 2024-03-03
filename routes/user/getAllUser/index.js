const express = require('express')
const router = express.Router()

// 获取当前登录用户
router.get('/admin/base/open/allUser', async (req, res, next) => {
  const con = req.mysqlConnection;
  const [results] = await con.promise().query('SELECT * FROM `users`');
  res.jsonSuccess(results);
});

module.exports = router;
