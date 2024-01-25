var { expressjwt: jwt } = require('express-jwt');

const verifyToken = (req, res, next) => {
  // 从请求头或其他地方获取token
  const token = req.headers.authorization;

  // 排除不需要验证的路由
  const excludedRoutes = ['/api/admin/base/open/captcha', '/api/admin/base/open/login', /^\/static\/.*/, /^\/api*/];
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
  
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  jwt.verify(token, global.servers.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Failed to authenticate token' });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;