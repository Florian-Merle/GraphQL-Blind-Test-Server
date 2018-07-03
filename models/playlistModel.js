const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: String,
    genre: String,
    musics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'music',
        }
    ],
});

module.exports = mongoose.model('playlist', playlistSchema);
