const express = require('express');
const router = express.Router();
let mysqlPool = require('../../../config/config');
const { successResponse, failResponse } = require('../../../utils/const');

const checkSqlMapping = 'select * from file_space where id in (?)';
const deleteSqlMapping = 'delete from file_space where id in (?)';
const deleteRelationSqlMapping = 'delete from file_space_list where classify_id in (?)';

router.post('/admin/space/type/delete', async (req, res, next) => {
  const { id } = req.body;
  let count = id.length;
  const con = await mysqlPool.acquire();
  const [results] = await con.promise().query(checkSqlMapping, [id]);
  if (results.length !== count) {
    res.status(500).send({
      ...failResponse,
      msg: '所选条目不存在',
    });
    mysqlPool.release(con);
    return;
  }
  const [re] = await con.promise().query(deleteSqlMapping, [id]);
  if (re.affectedRows > 0) {
    const [relationRes] = await con.promise().query(deleteRelationSqlMapping, [id]);
    if (relationRes.affectedRows > 0) {
      res.status(200).send({...successResponse, msg: '删除成功'});
      mysqlPool.release(con);
      return;
    }
  }
  res.status(500).send({...failResponse, msg: '删除失败'});
  mysqlPool.release(con);
})

module.exports = router;