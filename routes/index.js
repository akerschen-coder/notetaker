//requires
const express = require('express');
const notes = require('./notes');
// app
const app = express();
// pushes to notes
app.use('/notes', notes);
// exports
module.exports = app;
