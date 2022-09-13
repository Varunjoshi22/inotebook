const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



// Route 1: Get All the notes using Get: "/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);

    }
    catch (error) {

    }
})

// Route 2: Add a new Note using Post "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be min of 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })

        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")

    }
})

// Route 3: Update an existing Note using Post "/api/notes/updatenote".  NO Login Required 


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a new object 
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    // searching for the title description and the tag from the database

    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("User Not found") }

    if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") }//check whether the user is changing his own note or someone else

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });//syntax to update the note 
    res.json({ note });


})
module.exports = router