
const db = require('../index');

const getNotes = function(userId) {
  const queryParams = [userId];
  const queryString = `SELECT * FROM notes WHERE user_id = $1;`
  return db.query(queryString, queryParams);
};

const getNote = function(noteId) {
  const queryParams = [noteId];
  const queryString = `SELECT * FROM notes WHERE id = $1;`
  return db.query(queryString, queryParams);
};

const addNote = function(noteInfo) {
  const queryParams = [noteInfo.userId, noteInfo.text]
  const queryString = `UPDATE notes SET text = $1 WHERE id = $2`
  return db.query(queryString, queryParams)
};

const removeNote = function(noteId) {
  const queryParams = [noteId];
  const queryString = `DELETE FROM notes WHERE id = $1`
  return db.query(queryString, queryParams);
};

module.exports = { getNotes, getNote, addNote, removeNote };