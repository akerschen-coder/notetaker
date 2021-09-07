// all the requires 
const express = require('express');
const path = require('path');
const api = require('./routes/api');

// port and app
const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

//send to notes page 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//send to index page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// listener 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
); 