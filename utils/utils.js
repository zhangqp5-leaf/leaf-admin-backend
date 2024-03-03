const fs = require('fs');
const path = require('path');
const { camelCase } = require('lodash');

const snakeCaseToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => snakeCaseToCamelCase(item));
  }
  if (typeof obj === 'object' && obj !== null && !(obj instanceof Date)) {
    const newObj = {};
    
    for (const key in obj) {
      const camelCaseKey = camelCase(key);
      newObj[camelCaseKey] = snakeCaseToCamelCase(obj[key]);
    }
    
    return newObj;
  }
  
  return obj;
};

const getAllRouteDirs = (tempPath='./routes') => {

  const items = fs.readdirSync(tempPath);
  let res = [];
  // 遍历当前目录中所有的文件和文件夹
  items.map(item => {
    let temp = path.join(tempPath, item);
    if (item === 'index.js') {
      const _path = './' + tempPath.replaceAll('\\', '/');
      res.push(_path);
    }
    // 若当前的为文件夹
    if( fs.statSync(temp).isDirectory() ){
      res = [ ...res, ...getAllRouteDirs( temp ) ];
    }
  });
  return res;
}

module.exports = {
  snakeCaseToCamelCase,
  getAllRouteDirs,
};