const express = require('express');
const router = express.Router();

const sqlMapping = 'SELECT * from file_space';

// 获取文件中心类别列表
router.get('/admin/space/type/page', async (req, res, next) => {
  const con = req.mysqlConnection;
  const [results] = await con.promise().query(sqlMapping);
  res.jsonSuccess(results);
});

module.exports = router;