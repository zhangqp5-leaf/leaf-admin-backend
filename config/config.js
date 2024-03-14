const mysql = require('mysql2');
const { createPool } = require('generic-pool');
const redis = require('redis');
const { Client } = require('@elastic/elasticsearch');

const mongoUri = "mongodb+srv://leaf:4T3XujHdDPzonTY3@mongo-leaf.4qwnjjp.mongodb.net/leaf-db?retryWrites=true&w=majority";

const mysqlPool = createPool({
  create: function() {
    return mysql.createConnection({
      host: '122.51.12.76',
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
  url: 'redis://:ysn219zqp221@122.51.12.76:6379',
});

redisClient.connect();
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});
redisClient.on('error', (err) => {
  console.log(`Error ${err}`)
});

const esClient = new Client({
  node: 'http://122.51.12.76:9200',
  // auth: {
  //   apiKey: 'aEdWemFvMEItUXU3dllBLWQxR2g6TE10NDktU09RRkNkd1JxaGpiZFd6UQ=='
  // }
});

// mongoose.connect(uri)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to MongoDB', error);
//   });

module.exports = {
  mysqlPool,
  redisClient,
  esClient,
};

