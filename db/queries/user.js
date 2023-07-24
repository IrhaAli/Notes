const db = require('../index');

const getUserByEmail = function(email) {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  const queryParams = [email];
  return db.query(queryString, queryParams);
};

const getUserById = function(userId) {
  const queryString = `SELECT * FROM users WHERE id = $1`;
  const queryParams = [userId];
  return db.query(queryString, queryParams);
};

const addUser = function(userInfo) {
  const queryParams = [userInfo.email, userInfo.password];
  const queryString = 'INSERT INTO users (email, password) VALUES ($1, $2)'
  return db.query(queryString, queryParams);
};

module.exports = { getUserByEmail, getUserById, addUser };