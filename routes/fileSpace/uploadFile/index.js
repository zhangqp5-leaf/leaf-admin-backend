const express = require('express');
const router = express.Router();
const multer =require('multer');

// 配置multer的diskStorage存储方式
const storage = multer.diskStorage({
  // 配置文件上传目标文件夹
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  // 配置文件名
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

// 配置 multer 相关参数
const upload = multer({ storage: storage });

// 配置文件上传接口
router.post('/admin/base/comm/upload', upload.single('file'), function (req, res, next) {
  const file = req.file
  if (!file) {
    return res.jsonFail(500, '请选择文件');
  }
  res.jsonSuccess({
    url: `http://192.168.2.181:2119/static/images/${file.filename}`,
  });
});

module.exports = router;