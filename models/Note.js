const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'Article' },
    title: String,
    body: String,
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;