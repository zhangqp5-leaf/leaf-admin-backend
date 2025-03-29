const mysql = require('mysql2');
const { createPool } = require('generic-pool');
const redis = require('redis');
// const { Client } = require('@elastic/elasticsearch');

// const mongoUri = "mongodb+srv://leaf:4T3XujHdDPzonTY3@mongo-leaf.4qwnjjp.mongodb.net/leaf-db?retryWrites=true&w=majority";

const mysqlPool = createPool({
  create: function() {
    return mysql.createConnection({
      host: '118.31.168.157',
      user: 'root',
      password: 'YSN219@zqp221',
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

const redisClient = redis.createClient({
  socket: {
    host: "118.31.168.157", // 服务器公网 IP
    port: 6379
  },
  password: "ysn219zqp221" 
});

redisClient.connect();
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
  console.log(`Error ${err}`)
});

// const esClient = new Client({
//   node: 'http://118.31.168.157:9200',
//   // auth: {
//   //   apiKey: 'aEdWemFvMEItUXU3dllBLWQxR2g6TE10NDktU09RRkNkd1JxaGpiZFd6UQ=='
//   // }
//   auth: {
//     username: 'elastic', // 例如 'elastic'
//     password: 'VKIH1AWTfl32EBw9dVsL',   // 之前 `elasticsearch-setup-passwords` 时设置的密码
//   },
// });
// // esClient.indices.create({
// //   index: 'leaf_chat'
// // }, (err, resp) => {
// //   if (err) console.error(err)
// //   else console.log("Create Index:", resp)
// // })
// // mongoose.connect(uri)
// //   .then(() => {
// //     console.log('Connected to MongoDB');
// //   })
// //   .catch((error) => {
// //     console.error('Failed to connect to MongoDB', error);
// //   });

module.exports = {
  mysqlPool,
  redisClient,
  // esClient,
};


// // Changed password for user apm_system
// // PASSWORD apm_system = zEBpmdZKt8Nnf0wPW6r4

// // Changed password for user kibana_system
// // PASSWORD kibana_system = rWlZd8vFoF7aKEnlUAqo

// // Changed password for user kibana
// // PASSWORD kibana = rWlZd8vFoF7aKEnlUAqo

// // Changed password for user logstash_system
// // PASSWORD logstash_system = 4bMCgUSYNZTlxQz3B2u9

// // Changed password for user beats_system
// // PASSWORD beats_system = Abafm8IaYKfa4Va3ChHU

// // Changed password for user remote_monitoring_user
// // PASSWORD remote_monitoring_user = uQZ4ZJM49ruF6JXfTdwS

// // Changed password for user elastic
// // PASSWORD elastic = VKIH1AWTfl32EBw9dVsL