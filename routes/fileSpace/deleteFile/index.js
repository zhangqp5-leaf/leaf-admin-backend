const express = require('express');
const router = express.Router();

const sqlMapping = 'delete from file_space_list where id = ?;'

router.post('/admin/space/info/delete', async (req, res, next) => {
  try {
    const { id } = req.body;
    // 删除文件
    const con = req.mysqlConnection;
    const [result] = await con.promise().execute(sqlMapping, [id]);
    if (result.affectedRows > 0) {
      res.jsonSuccess({});
    } else {
      res.jsonFail(500, '删除失败');
    }
  } catch (error) {
    res.jsonFail(500, '删除失败');
  }
});

module.exports = router;