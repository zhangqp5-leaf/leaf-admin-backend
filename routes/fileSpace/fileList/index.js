const express = require('express');
const router = express.Router();

const sqlMapping = 'select * from file_space_list';

router.get('/admin/space/info/page', async (req, res, next) => {
  const { classifyId, pageNo, pageSize } = req.query;
  let offset = (pageNo - 1) * pageSize;
  let sql = `${sqlMapping} where classify_id = ${classifyId} order by create_time desc limit ${offset},${pageSize}`;
  const con = req.mysqlConnection;
  const [results] = await con.promise().query(sql);
  const [re] = await con.promise().query(`select classify_id from file_space_list where classify_id = ?`, [classifyId]);
  const _data = {
    list: results,
    pagination: {
      pageNo,
      pageSize,
      total: re.length,
    },
  };
  res.jsonSuccess(_data);
});

module.exports = router;