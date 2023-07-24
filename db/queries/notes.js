
const db = require('../index');

const getNotes = function(userId) {
  const queryParams = [userId];
  const queryString = `SELECT * FROM notes WHERE user_id = $1;`
  return db.query(queryString, queryParams);
};

const getNoteById = function(noteId) {
  const queryParams = [noteId];
  const queryString = `SELECT * FROM notes WHERE id = $1;`
  return db.query(queryString, queryParams);
};

const addNote = function(noteInfo) {
  const queryParams = [noteInfo.userId, noteInfo.text]
  const queryString = `INSERT INTO notes (user_id, text) VALUES ($1, $2) RETURNING id;`
  return db.query(queryString, queryParams)
};

const updateNote = function(noteInfo) {
  const queryParams = [noteInfo.text, noteInfo.noteId]
  const queryString = `UPDATE notes SET text = $1 WHERE id = $2 RETURNING id`
  return db.query(queryString, queryParams)
};

const rightNoteOwner = function(noteId, userId) {
  const queryParams = [noteId, userId];
  const queryString = `SELECT * FROM notes WHERE id = $1 AND user_id = $2;`
  return db.query(queryString, queryParams);
}

const removeNote = function(noteId) {
  const queryParams = [noteId];
  const queryString = `DELETE FROM notes WHERE id = $1`
  return db.query(queryString, queryParams);
};

const shareNote = function(userId, noteId) {
  return getNoteById(noteId)
  .then(({rows: note}) => {
    text = note[0].text;
    noteInfo = { text, userId };
    addNote(noteInfo);
  })
};

module.exports = { getNotes, getNoteById, updateNote, addNote, removeNote, rightNoteOwner, shareNote };