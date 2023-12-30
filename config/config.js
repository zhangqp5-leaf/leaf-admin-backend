// const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'ysn219zqp221',
//   database: 'leafdb'
// });

// module.exports = connection;

const mysql = require('mysql2');
const { createPool } = require('generic-pool');

const mysqlPool = createPool({
  create: function() {
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'ysn219zqp221',
      database: 'leaf_admin'
    });
  },
  destroy: function(connection) {
    connection.end();
  },
  max: 20,
  min: 0,
  idleTimeoutMillis: 30000,
  acquireTimeoutMillis: 30000,
  waitForConnections: true,
});

module.exports = mysqlPool;