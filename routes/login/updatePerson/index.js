const express = require('express');
const router = express.Router();
const mysqlPool = require('../../../config/config');
const { successResponse, failResponse } = require('../../../utils/const');

router.post('/admin/base/comm/personUpdate', async (req, res) => {
  const { headImg, nickname, oldPassword, password } = req.body;
  const username = req.cookies.username;
  const con = await mysqlPool.acquire();
  if (oldPassword && password) {
    const [results] = await con.promise().query('select * from users where username = ? and password = ?', [username, oldPassword]);
    if (!results.length) {
      res.status(500).send({...failResponse, msg: '用户不存在或原密码错误'});
      mysqlPool.release(con);
      return;
    }
    const [re] = await con.promise().execute('update users set password = ? where username = ?', [password, username]);
    if (re.affectedRows === 0) {
      res.status(500).send({...failResponse, msg: '修改失败'});
      mysqlPool.release(con);
      return;
    }
  }
  if (headImg) {
    const [results] = await con.promise().execute('update users set headImg = ? where username = ?', [headImg, username]);
    if (results.affectedRows === 0) {
      res.status(500).send({...failResponse, msg: '修改失败'});
      mysqlPool.release(con);
      return;
    }
  }
  if (nickname) {
    const [results] = await con.promise().execute('update users set nickname = ? where username = ?', [nickname, username]);
    if (results.affectedRows === 0) {
      res.status(500).send({...failResponse, msg: '修改失败'});
      mysqlPool.release(con);
      return;
    }
  }
  if (!headImg && !nickname) {
    res.status(500).send({...failResponse, msg: '没有可更新信息'});
    mysqlPool.release(con);
    return;
  }
  res.status(200).send({
    ...successResponse,
    data: { headImg, nickname, password },
  });
  mysqlPool.release(con);
});

module.exports = router;