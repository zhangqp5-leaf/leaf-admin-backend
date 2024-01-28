var express = require('express');
var router = express.Router();
const mysqlPool = require('../../../config/config');

router.post('/v1/user/delete', async (req, res, next) => {
  const { ids } = req.body;
  console.log(ids);
  const sqlIds = ids.join(',');
  const deleteSqlMapping = `delete from demo_user where id in (${sqlIds})`;
  const con = await mysqlPool.acquire();
  const [results] = await con.promise().execute(deleteSqlMapping);
  if (results.affectedRows > 0) {
    res.jsonSuccess(results);
  } else {
    res.jsonFail(500, '删除失败');
  }
  mysqlPool.release(con);
});

module.exports = router;
 