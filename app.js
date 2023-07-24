// Web server config
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const db = require('./db');

// Separated Routes for each Resource
const notesRoutes = require('./routes/notes');

// Mount all resource routes
app.use('/api/notes', notesRoutes(db));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
