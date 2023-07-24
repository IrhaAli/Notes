const router = require("express").Router();
const { getNotes, getNote, addNote, removeNote } = require('../db/queries/notes');

module.exports = () => {
  // GET /api/notes: get a list of all notes for the authenticated user.
  router.get("/", (req, res) => {
    const userId = req.signedCookies.name;;
    getNotes(userId)
      .then((notes) => {
        res.send(notes.rows);
      })
  });

  // GET /api/notes/:id: get a note by ID for the authenticated user.
  router.get("/:id", (req, res) => {
    const userId = req.signedCookies.name;;
    const noteId = req.url.substring(1);
    getNotes(userId, noteId)
      .then((notes) => {
        res.send(notes.rows);
      })
  });

  // POST /api/notes: create a new note for the authenticated user.
  router.post("/", (req, res) => {
    // Validate notes
    const { user_id, text } = req.body;
    const noteInfo = { user_id, text };
    let status = 400
    if (!text) {
      return res.status(status).send("Please include some text in this notes.")
    }
    if (!user_id) {
      return res.status(status).send("It seems you're trying to add notes withtout logging in")
    }

    // If note entry is valid add it to the note table
    addNote(db, noteInfo)
      .then((note) => {
        res.status(200).send(note.rows[0]);
      })
  });

  // PUT /api/notes/:id: update an existing note by ID for the authenticated user.
  router.put("/:id", (req, res) => {
    // Validate notes
    const { noteId, text } = req.body;
    const noteInfo = { noteId, text };
    let status = 400
    if (!text) {
      return res.status(status).send("Are you trying to delete your note?")
    }
    if (!user_id) {
      return res.status(status).send("It seems you're trying to edit notes withtout logging in")
    }

    // If note entry is valid add it to the note table
    addNote(db, noteInfo)
      .then((note) => {
        res.status(200).send(note.rows[0]);
      })
  });

  // DELETE /api/notes/:id: delete a note by ID for the authenticated user.
  router.delete("/delete", (req, res) => {
    const noteId = Object.keys(req.body)[0]
    removeNote(db, noteId)
      .then(() => {
        res.status(200).send("Note Removed")
      })
  });

  // POST /api/notes/:id/share: share a note with another user for the authenticated user.
  router.post("/:id/share", (req, res) => {
    const userId = req.body;


    // If note entry is valid add it to the note table
    addNote(userId, noteId)
      .then((note) => {
        res.status(200).send("Note shared successfully");
      })
  });

  return router;
};