const express = require('express');
const router = express.Router();

const sqlMapping = 'select * from demo_user';

router.get('/v1/queryUserList', async (req, res, next) => {
  const { name, nickName, gender, current, pageSize } = req.query;
  const nameSql = name ? `name like '%${name}%' and` : '';
  const nickNameSql = nickName ? `nick_name like '%${nickName}%' and` : '';
  const genderSql = gender ? `gender = '${gender}' and` : '';
  let offset = (current - 1) * pageSize;
  let sql = `${sqlMapping} where ${nameSql} ${nickNameSql} ${genderSql} 1=1 order by create_time desc limit ${offset},${pageSize}`;
  const con = req.mysqlConnection;
  const [results] = await con.promise().query(sql);
  const [re] = await con.promise().query(`select name from demo_user where ${nameSql} ${nickNameSql} ${genderSql} 1=1`);
  const _data = {
    list: results,
    pagination: {
      current,
      pageSize,
      total: re.length,
    },
  };
  res.jsonSuccess(_data);
});

module.exports = router;
