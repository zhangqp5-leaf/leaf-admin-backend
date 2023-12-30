const sql = {
  login: `SELECT * FROM users WHERE username=? AND password=?`,
};

module.exports = sql;