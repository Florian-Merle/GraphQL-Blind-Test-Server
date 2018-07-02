const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: String,
    genre: String,
});

module.exports = mongoose.model('playlist', playlistSchema);
