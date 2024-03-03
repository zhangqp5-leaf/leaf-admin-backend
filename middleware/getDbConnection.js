const { mysqlPool } = require('../config/config');

// 从连接池中获取数据库连接
const getConnectionFromPool = async (req, res, next) => {
  try {
    const con = await mysqlPool.acquire();
    req.mysqlConnection = con;

    // 在响应结束后释放连接
    res.on('finish', () => {
      mysqlPool.release(req.mysqlConnection);
    });

    next();
  } catch (err) {
    console.error('Error getting connection from pool:', err);
    res.jsonFail(500, 'Internal Server Error');
  }
};

module.exports = getConnectionFromPool;