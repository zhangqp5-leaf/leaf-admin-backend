const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  // 排除不需要验证的路由
  const excludedRoutes = ['/api/admin/base/open/captcha', '/api/admin/base/open/login', '/api/chat/info', /^\/static\/.*/];
  const isExcluded = excludedRoutes.some(route => {
    if (route instanceof RegExp) {
      return route.test(req.originalUrl);
    } else {
      return req.originalUrl.startsWith(route);
    }
  });
  if (isExcluded) {
    return next();
  }
  
  // 获取token
  const token = req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  // 解码
  jwt.verify(token, global.servers.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Token verification failed' });
    }

    // 检查token是否快要过期
    const currentTime = Date.now() / 1000;
    const expirationTime = decoded.exp;
    const refreshTokenThreshold = 30 * 60; // 自定义刷新时间阈值（单位：秒）

    if (expirationTime - currentTime <= refreshTokenThreshold) {
      console.log({decoded})
      // token快要过期，创建新的token并将其发送到客户端
      const newToken = jwt.sign({
        username: decoded.username,
        role: decoded.role,
      }, global.servers.SECRET_KEY, { expiresIn: '1h' }); // 使用相同的密钥进行签名
      res.setHeader('Authorization', `${newToken}`);
    }

    // 在请求中将解码后的token信息存储起来，以便其他路由或中间件使用
    req.user = decoded;

    // 继续处理请求
    next();
  });
};

module.exports = verifyToken;