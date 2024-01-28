const express = require('express');
const router = express.Router();
let mysqlPool = require('../../../config/config');

const selectSqlMapping = 'select name from file_space where name = ?';
const insertSqlMapping = 'insert into file_space (name, create_time) values (?, ?)';

router.post('/admin/space/type/add', async (req, res, next) => {
  const { name } = req.body;
  const conn = await mysqlPool.acquire();
  const [results] = await conn.promise().query(selectSqlMapping, [name]);
  if (results.length > 0) {
    res.jsonFail(500, '该类别已存在');
  } else {
    await conn.promise().execute(insertSqlMapping, [name, new Date()]);
    res.jsonSuccess({});
  }
  mysqlPool.release(conn);
});

module.exports = router;