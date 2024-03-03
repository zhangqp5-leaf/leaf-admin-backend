const express = require('express');
const router = express.Router();

const selectSqlMapping = 'select name from file_space where name = ?';
const insertSqlMapping = 'insert into file_space (name, create_time) values (?, ?)';

router.post('/admin/space/type/add', async (req, res, next) => {
  const { name } = req.body;
  const con = req.mysqlConnection;
  const [results] = await con.promise().query(selectSqlMapping, [name]);
  if (results.length > 0) {
    res.jsonFail(500, '该类别已存在');
  } else {
    await con.promise().execute(insertSqlMapping, [name, new Date()]);
    res.jsonSuccess({});
  }
});

module.exports = router;