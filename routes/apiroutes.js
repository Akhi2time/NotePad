const app = require('express').Router()
const fs = require('fs');
const path = require('path');
let allNotes = require('../db/db.json');


app.get('/api/notes', (req, res) => {
    allNotes =JSON.parse(fs.readFileSync("./db/db.json"))
    res.json(allNotes);
});



function createNewNote(body, notesArray) {
    const newNote = body;
   
     newNote.id = Math.floor(Math.random() * 892)  
  
    allNotes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(allNotes))
    
    return allNotes;
}

function deleteNote(id,notesArray){
    let tempArray = []
    for(let i=0;i<notesArray.length;i++){
        if(notesArray[i].id != id){
            tempArray.push(notesArray[i])
        }
    }
    notesArray = tempArray
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return notesArray;
}


app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

module.exports = app;
