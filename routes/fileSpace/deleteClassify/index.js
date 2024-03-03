const express = require('express');
const router = express.Router();

router.post('/admin/space/type/delete', async (req, res, next) => {
  const { id } = req.body;
  let count = id.length;
  const ids = id.join(',');
  const checkSqlMapping = `select * from file_space where id in (${ids})`;
  const deleteSqlMapping = `delete from file_space where id in (${ids})`;
  const con = req.mysqlConnection;
  // 判断该数据在主表中是否存在
  const [results] = await con.promise().query(checkSqlMapping);
  if (results.length !== count) {
    res.jsonFail(500, '所选条目不存在');
    return;
  }
  const [re] = await con.promise().execute(deleteSqlMapping);
  const selectRelationSqlMapping = `select * from file_space_list where classify_id in (${ids})`;
  const deleteRelationSqlMapping = `delete from file_space_list where classify_id in (${ids})`;
  if (re.affectedRows > 0) {
    // 判断该数据在关联表中是否存在
    const [selectRelationRes] = await con.promise().query(selectRelationSqlMapping);
    if (selectRelationRes.length > 0) {
      const [relationRes] = await con.promise().execute(deleteRelationSqlMapping);
      if (relationRes.affectedRows > 0) {
        res.jsonSuccess({});
        return;
      }
    } else {
      res.jsonSuccess({});
      return;
    }
  }
  res.jsonFail(500, '删除失败');
})

module.exports = router;