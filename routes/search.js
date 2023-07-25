const router = require("express").Router();
const { getNotesByQuery } = require('../db/queries/notes');

module.exports = () => {
  // GET /api/search?q=:query: search for notes based on keywords for the authenticated user.
  router.get("/search", (req, res) => {
    const searchQuery = req.query.text;
    const userId = req.signedCookies.name;
    
    getNotesByQuery(searchQuery, userId)
    .then(({ rows: notes }) => {
        res.json(notes);
      });
  });

  return router;
};