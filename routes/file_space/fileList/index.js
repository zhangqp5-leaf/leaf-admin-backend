const express = require('express');
const router = express.Router();
let mysqlPool = require('../../../config/config');
const { successResponse } = require('../../../utils/const');
const { snakeCaseToCamelCase } = require('../../../utils/utils');

const sqlMapping = 'select * from file_space_list';

router.get('/admin/space/info/page', async (req, res, next) => {
  const { classifyId, pageNo, pageSize } = req.query;
  let offset = (pageNo - 1) * pageSize;
  let sql = `${sqlMapping} where classify_id = ${classifyId} order by create_time desc limit ${offset},${pageSize}`;
  const conn = await mysqlPool.acquire();
  const [results] = await conn.promise().query(sql);
  const [re] = await conn.promise().query(`select classify_id from file_space_list where classify_id = ?`, [classifyId]);
  let ret = {
    ...successResponse,
    data: {
      list: snakeCaseToCamelCase(results),
      pagination: {
        pageNo,
        pageSize,
        total: re.length,
      },
    },
  };
  res.status(200).send(ret);
  mysqlPool.release(conn);
});

module.exports = router;