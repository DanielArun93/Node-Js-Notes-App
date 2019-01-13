
console.log("app.js started");
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes/notes');

console.log(yargs.argv);

var TitleObj = {
    describe: "Title of Note",
    demand: true,
    alias: 't'
}

var Bodyobj = {
    describe: "Body of Note",
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add the content', {
        title: TitleObj,
        body: Bodyobj
    })
    .command('list', 'List all Notes')
    .command('remove', 'Delete specific Note',{
        title:TitleObj
    })
    .command('read', 'Read particular Note',{
        title:TitleObj
    })
    .help()
    .argv;
//var command = process.argv[2];
var command = argv._[0];
// console.log("Command :",command);
// console.log("Yargs: ",yargs.argv);


if (command === "add") {
    var note = notes.addNote(yargs.argv.title, yargs.argv.body);
    if (note) {
        console.log("Note Created");
        notes.logNote(note);
    }
    else {
        console.log("Title alredy taken");
    }
}
else if (command === "remove") {

    var removedNotes = notes.removeNote(yargs.argv.title);
    var message = removedNotes ? "Notes removed Successfully" : "Notes not available";
    console.log(message);
}
else if (command === "list") {
    var items = notes.listNoteAll();
    if (items.length !== 0) {
        for (var i = 0; i < items.length; i++) {
            notes.logNote(items[i]);
        }
    }
    else {
        console.log("Notes are empty");
    }

}
else if (command === "read") {

    var selectedNote = notes.readNote(yargs.argv.title);
    if (selectedNote) {
        console.log("Note Found");
        notes.logNote(selectedNote);
    }
    else {
        console.log("Note not found");
    }
}
else {
    console.log("Command not found");
}