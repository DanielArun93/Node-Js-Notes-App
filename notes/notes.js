console.log("notes.js started");
const fs = require('fs');

var fetchNote = () => {
  try {
    var oldNotes = fs.readFileSync('notes-data.json');
    return JSON.parse(oldNotes);
  }
  catch (e) {
    return [];
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}


const addNote = (title, body) => {
  var notes = fetchNote();
  var note = {
    title: title,
    body: body
  }


  var duplicateNotes = notes.filter((note) => {
    return note.title === title
  })

  if (duplicateNotes.length == 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }


}

const removeNote = (title) => {

  var Tnotes = fetchNote();
  var filteredNotes = Tnotes.filter((note) => {
    return note.title !== title;
  });
  saveNotes(filteredNotes);
  return Tnotes.length !== filteredNotes.length;

}

const listNoteAll = () => {
  var notes = fetchNote();
  return notes;
}

const readNote = (title) => {
  var notes = fetchNote();
  var selectedNote = notes.filter((note) => note.title === title);
  return selectedNote[0];
}

const logNote = (note) => {
  console.log("...")
  console.log("Title:", note.title);
  console.log("Body:", note.body);
}

module.exports = {
  addNote: addNote,
  removeNote,
  listNoteAll,
  readNote,
  logNote
}