var express = require('express');
var OpenAI = require('openai');
var router = express.Router();
const { isNull } = require('lodash');

const openai = new OpenAI({
  baseURL: 'https://api.siliconflow.cn/v1',
  apiKey: 'sk-efzvvaxnleliyrnmgprlxlzxiraezpnmgatimeppyxptfayw'
});

router.post('/chat/info', async function(req, res, next) {
  try {
    const completion = await openai.chat.completions.create(req.body);

    // 写入开始标记
    res.write('{"type":"start"}\n');

    for await (const chunk of completion) {
      const chunk_message = chunk.choices[0].delta.reasoning_content;
      
      if (!isNull(chunk_message)) {
        // 为reasoning_content添加类型标记
        res.write(JSON.stringify({
          type: 'reasoning',
          content: chunk_message
        }) + '\n');
      }
      const message = chunk.choices[0].delta.content;
      if (!isNull(message)) {
        // 为content添加类型标记
        res.write(JSON.stringify({
          type: 'content',
          content: message
        }) + '\n');
      }
    }
    // 写入结束标记
    res.write('{"type":"end"}\n');
    res.end();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
