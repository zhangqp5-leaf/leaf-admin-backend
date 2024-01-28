const express = require('express');
const router = express.Router();
const mysqlPool = require('../../../config/config');

const selectSqlMapping = 'select id from demo_rule where id = ?';
const insertSqlMapping = 'insert into demo_rule(id, name, `desc`, frequency, target, template, time, type) values(?, ?, ?, ?, ?, ?, ?, ?)';
const updateSqlMapping = 'update demo_rule set name=?, `desc`=?, frequency=?, target=?, template=?, time=?, type=? where id = ?';

router.post('/v1/user/update', async (req, res, next) => {
  const { id, name, desc, frequency, target, template, time, type='1' } = req.body;
  const con = await mysqlPool.acquire();
  const [selectRes] = await con.promise().query(selectSqlMapping, [id]);
  if (selectRes.length > 0) {
    await con.promise().execute(updateSqlMapping, [name, desc, frequency, target, template, time, type, id]);
  } else {
    await con.promise().execute(insertSqlMapping, [id, name, desc, frequency, target, template, time, type]);
  }
  res.json({});
  mysqlPool.release(con);
});

module.exports = router;