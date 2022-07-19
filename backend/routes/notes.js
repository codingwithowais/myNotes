const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


const Notes = require('../models/Notes')
const fetchUser = require('../middlewares/getuser');


// Adding a note by the user using:POST // LOGIN REQUIRED



router.post('/addnotes', [
  body('title', 'title must be at least 3 chractrers').isLength({ min: 3 }),

  body('description', 'description must be at least 5 chractrers').isLength({ min: 5 })
], fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    newNotes = await new Notes({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag


    })
    newNotes.save();
    res.json(newNotes);
  }
  catch (error) {
    console.error(error.message);
return    res.status(500).json({ error: 'Server error' });

  }








  // const User = user(req.body);
  // User.save();
  // console.log(req.body);


})

// Fetching all the notes of the user using:GET // LOGIN REQUIRED

router.get('/fetchnotes', fetchUser, async (req, res) => {
  try {

    let notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
  return  res.status(500).json({ error: 'Server error' });

  }

})
// Updating an exisitng notes of a user by id using:PUT // LOGIN REQUIRED
router.put('/updatenotes/:id', fetchUser, async (req, res) => {
  try {
    let { title, description, tag } = req.body;
    let updateNotes = {};
    if (title) {
      updateNotes.title = title;
    }
    if (description) {
      updateNotes.description = description;
    }
    if (tag) {
      updateNotes.tag = tag;
    }

    let notes = await Notes.findById(req.params.id);
    if (notes.user.toString() != req.user.id) {
     return res.status(401).send('Action not allowed')
    }
    notes = await Notes.findByIdAndUpdate(req.params.id, { $set: updateNotes }, { new: true });
    res.json(notes);
  }
  catch (error) {
    console.error(error.message);
  return  res.status(500).json({ error: 'Server error' });

  }

})
// Deleting a note from the database using: DELETE // LOGIN REQUIRED 
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
     return res.status(404).send('Not Found')
    }
    if (notes.user.toString() != req.user.id) {
      res.status(401).send('Action not allowed')
    }
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({notes:notes,sucess:"Note has been deleted successfully"});
  }
  catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Server error' });

  }

})


module.exports = router;


