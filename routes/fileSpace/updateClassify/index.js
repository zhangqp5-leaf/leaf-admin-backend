const express = require('express');
const router = express.Router();
let mysqlPool = require('../../../config/config');

const checkSqlMapping = 'select * from file_space where id = ?';
const updateSqlMapping = 'update file_space set name = ?, update_time = ? where id = ?';

router.post('/admin/space/type/update', async (req, res, next) => {
  const { id, name } = req.body;
  const con = await mysqlPool.acquire();
  const [results] = await con.promise().query(checkSqlMapping, [id]);
  if (results.length === 0) {
    res.jsonFail(500, '错误的请求参数');
    mysqlPool.release(con);
    return;
  }
  await con.promise().query(updateSqlMapping, [name, new Date(), id]);
  res.jsonSuccess({});
  mysqlPool.release(con);
});

module.exports = router;