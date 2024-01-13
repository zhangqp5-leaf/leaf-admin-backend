const express = require('express');
const router = express.Router();
const mysqlPool = require('../../../config/config');
const { successResponse, failResponse } = require('../../../utils/const');

const sqlMapping = 'insert into file_space_list (classify_id, file_id, name, size, type, url, create_time) values (?,?,?,?,?,?,?);'

router.post('/admin/space/info/add', async (req, res, next) => {
  const { classifyId, fileId, name, size, type, url } = req.body;
  const con = await mysqlPool.acquire();
  await con.promise().execute(sqlMapping, [classifyId, fileId, name, size, type, url, new Date()]);
  res.status(200).send({
    ...successResponse,
  });
  mysqlPool.release(con);
});

module.exports = router;