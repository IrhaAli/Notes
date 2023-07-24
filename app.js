// Web server config
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))

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
app.use('/api/notes', notesRouter);
app.use('/api/search', searchRouter);
app.use('/api/auth', authRouter(cookieParams));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
