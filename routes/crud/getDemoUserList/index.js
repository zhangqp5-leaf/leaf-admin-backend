const express = require('express');
const router = express.Router();
const mysqlPool = require('../../../config/config');

const sqlMapping = 'select * from demo_user';

router.get('/v1/queryUserList', async (req, res, next) => {
  const { name, nickName, gender, current, pageSize } = req.query;
  const nameSql = name ? `name like '%${name}%' and` : '';
  const nickNameSql = nickName ? `nick_name like '%${nickName}%' and` : '';
  const genderSql = gender ? `gender = '${gender}' and` : '';
  let offset = (current - 1) * pageSize;
  let sql = `${sqlMapping} where ${nameSql} ${nickNameSql} ${genderSql} 1=1 order by create_time desc limit ${offset},${pageSize}`;
  const conn = await mysqlPool.acquire();
  const [results] = await conn.promise().query(sql);
  const [re] = await conn.promise().query(`select name from demo_user where ${nameSql} ${nickNameSql} ${genderSql} 1=1`);
  const _data = {
    list: results,
    pagination: {
      current,
      pageSize,
      total: re.length,
    },
  };
  res.jsonSuccess(_data);
  mysqlPool.release(conn);
});

module.exports = router;
