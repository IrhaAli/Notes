// Web server config
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const db = require('./db');
const cookieParser = require('cookie-parser');

const secretKey = 'foobarbaz12345';
app.use(cookieParser(secretKey));
const cookieParams = {
  httpOnly: true,
  signed: true,
};

// Separated Routes for each Resource
const notesRouter = require('./routes/notes');
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');

// Mount all resource routes
app.use('/api/notes', notesRouter(db));
app.use('/api/search', searchRouter(db));
app.use('/api/auth', authRouter(db, cookieParams));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
