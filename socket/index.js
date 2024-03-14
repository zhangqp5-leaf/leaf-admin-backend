const { esClient } = require('../config/config');

const userSockets = {};

const createSocketConnection = (io) => {

  io.on("connection", (socket) => {


    const username = socket.handshake.query.username;

    if (username) {
      // 关联userId与socket.id
      userSockets[username] = socket.id;

      // 还可以反向存储，便于查找
      socket.username = username;
    }

    socket.on('chat', async (data) => {
      await esClient.index({
        index: 'leaf_chat',
        body: data,
      });
      await esClient.indices.refresh({ index: 'leaf_chat' });
      const searchResult = await getChatList(data);
      socket.emit("chatBack", searchResult);
      const toSocketId = userSockets[data.recipientName];
      console.log({toSocketId});
      if (toSocketId) {
        io.to(toSocketId).emit('chatBack', searchResult);
      }
    });
    socket.on('getHistoryChat', async (data) => {
      const searchResult = await getChatList(data);
      console.log({searchResult});
      socket.emit("chatBack", searchResult);
    });
    
    // socket.emit("log", "1111111");
  });
};

// 查询聊天列表
const getChatList = async (data) => {
  const searchResult = await esClient.search({
    index: 'leaf_chat',
    body: {
      query: {
        bool: {
          must: [
            {
              bool: {
                should: [
                  { match: { username: data.username } },
                  { match: { username: data.recipientName } }
                ]
              }
            },
            {
              bool: {
                should: [
                  { match: { recipientName: data.username } },
                  { match: { recipientName: data.recipientName } }
                ]
              }
            },
          ]
        }
      },
      sort: [
        { timestamp: { order: 'desc' } } // 按时间戳降序排序
      ],
      size: 100,
    }
  });
  return searchResult.body.hits.hits;
}

module.exports = createSocketConnection;