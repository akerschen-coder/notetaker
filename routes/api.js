// all the requires 
const router = require('express').Router();
const notes = require('../db/utilsFs')


//get from main
router.get('/notes', (req, res) => {
  notes.getNotes().then((data) => {
    return res.json(data);
  }).catch((err) => res.status(500).json(err));
});

// for posting the get request 
router.post('/notes', (req, res) => {
  notes.createNote(req.body).then((data) => {
    return res.json(data);
  }).catch((err) => res.status(500).json(err));
});

// for deleting 
router.delete('/notes/:id', (req, res) => {
  notes.removeNote(req.params.id).then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
})


module.exports = router;