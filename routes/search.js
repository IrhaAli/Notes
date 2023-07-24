const router = require("express").Router();

module.exports = () => {
  // GET /api/search?q=:query: search for notes based on keywords for the authenticated user.
  router.get("/search?text=:", (req, res) => {
    const searchQuery = req.url.substring(1)
    getDrug(searchQuery)
      .then(({ rows: notes }) => {
        res.json(notes);
      });
  });

  return router;
};