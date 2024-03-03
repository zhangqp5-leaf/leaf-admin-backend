var express = require('express');
var router = express.Router();

const selectSqlMapping = 'select * from demo_user where name = ?';
const insertSqlMapping = 'insert into demo_user (name, nick_name, gender, create_time) values (?, ?, ?, ?)';

router.post('/v1/user', async (req, res, next) => {
  const { name, nickName, gender } = req.body;
  const con = req.mysqlConnection;
  const [result] = await con.promise().query(selectSqlMapping, [name]);
  if (result.length > 0) {
    res.jsonFail(500, '用户已存在');
    return;
  }
  const [results] = await con.promise().execute(insertSqlMapping, [name, nickName, gender, new Date()]);
  if (results.affectedRows > 0) {
    res.jsonSuccess(results);
  } else {
    res.jsonFail(500, '新增失败');
  }
});

module.exports = router;
