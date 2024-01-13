const express = require('express');
const router = express.Router();
const mysqlPool = require('../../../config/config');
const { successResponse, failResponse } = require('../../../utils/const');

const sqlMapping = 'delete from file_space_list where id = ?;'

router.post('/admin/space/info/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    // 删除文件
    const con = await mysqlPool.acquire();
    const [result] = await con.promise().execute(sqlMapping, [id]);
    if (result.affectedRows > 0) {
      res.status(200).send({...successResponse, msg: '删除成功'});
    } else {
      res.status(500).send({...failResponse, msg: '删除失败'});
    }
    mysqlPool.release(con);
  } catch (error) {
    console.log(error);
    res.status(500).send({...failResponse, msg: '删除失败'});
  }
});

module.exports = router;