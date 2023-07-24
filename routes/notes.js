const router = require("express").Router();
const { getNotes, getNoteById, updateNote, addNote, removeNote, rightNoteOwner, shareNote } = require('../db/queries/notes');

module.exports = () => {
  // GET /api/notes: get a list of all notes for the authenticated user.
  router.get("/", (req, res) => {
    const userId = req.signedCookies.name;
    getNotes(userId)
      .then((notes) => {
        res.send(notes.rows);
      })
  });

  // GET /api/notes/:id: get a note by ID for the authenticated user.
  router.get("/:id", (req, res) => {
    const noteId = req.url.substring(1);
    const userId = req.signedCookies.name;

    rightNoteOwner(noteId, userId)
      .then(({ rows: note }) => {
        if (note.length === 0) {
          res.status(400).send("Looks like you're trying to get someone else's note")
        }
        return getNoteById(noteId)
      })
      .then(({rows: note}) => {
        res.send(note);
      })
  });

  // POST /api/notes: create a new note for the authenticated user.
  router.post("/", (req, res) => {
    // Validate notes
    const text = req.body.text;
    const userId = req.signedCookies.name;
    const noteInfo = { userId, text };
    let status = 400
    if (!text) {
      return res.status(status).send("Please include some text in this notes.")
    }
    if (!userId) {
      return res.status(status).send("It seems you're trying to add notes withtout logging in")
    }

    // If note entry is valid add it to the note table
    addNote(noteInfo)
      .then((note) => {
        res.status(200).send(note.rows[0]);
      })
  });

  // PUT /api/notes/:id: update an existing note by ID for the authenticated user.
  router.put("/:id", (req, res) => {
    // Validate notes
    const text = req.body.text;
    const noteId = req.url.substring(1);
    const userId = req.signedCookies.name;
    const noteInfo = { noteId, text };

    let status = 400
    if (!text) {
      return res.status(status).send("Are you trying to delete your note?")
    }
    if (!userId) {
      return res.status(status).send("It seems you're trying to edit notes withtout logging in")
    }

    // If note entry is valid add it to the note table
    rightNoteOwner(noteId, userId)
      .then(({ rows: note }) => {
        if (note.length === 0) {
          res.status(400).send("Looks like you're trying to edit someone else's note")
        }
        return updateNote(noteInfo)
      })
      .then((note) => {
        res.status(200).send(note.rows[0]);
      })
  });

  // DELETE /api/notes/:id: delete a note by ID for the authenticated user.
  router.delete("/:id", (req, res) => {
    const noteId = req.url.substring(1);
    const userId = req.signedCookies.name;

    rightNoteOwner(noteId, userId)
      .then(({ rows: note }) => {
        if (note.length === 0) {
          res.status(400).send("Looks like you're trying to delete someone else's note")
        }
        return removeNote(noteId)
      })
      .then(() => {
        res.status(200).send("Note Removed")
      })
  });

  // POST /api/notes/:id/share: share a note with another user for the authenticated user.
  router.post("/:id/share", (req, res) => {
    const userId = req.body.userId;
    const noteId = req.url.split("/")[1];

    shareNote(userId, noteId)
      .then(() => {
        res.status(200).send("Note shared successfully");
      })
  });

  return router;
};