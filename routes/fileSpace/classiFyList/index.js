const express = require('express');
const router = express.Router();
let mysqlPool = require('../../../config/config');

const sqlMapping = 'SELECT * from FILE_SPACE';

// 获取文件中心类别列表
router.get('/admin/space/type/page', async (req, res, next) => {
  const conn = await mysqlPool.acquire();
  const [results] = await conn.promise().query(sqlMapping);
  res.jsonSuccess(results);
  mysqlPool.release(conn);
});

module.exports = router;