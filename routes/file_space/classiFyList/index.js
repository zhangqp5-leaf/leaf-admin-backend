const express = require('express');
const router = express.Router();
let mysqlPool = require('../../../config/config');
const { successResponse, failResponse }  = require('../../../utils/const');
const { snakeCaseToCamelCase } = require('../../../utils/utils');

const sqlMapping = 'SELECT * from FILE_SPACE';

// 获取文件中心类别列表
router.get('/admin/space/type/page', async (req, res, next) => {
  const conn = await mysqlPool.acquire();
  const [results] = await conn.promise().query(sqlMapping);
  const ret = {
    ...successResponse,
    data: snakeCaseToCamelCase(results),
  };
  res.status(200).send(ret);
  mysqlPool.release(conn);
});

module.exports = router;