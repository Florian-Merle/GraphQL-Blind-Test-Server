const mongoose = require('mongoose');
const MusicModel = mongoose.model('music');
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

playlistSchema.methods.addMusic = function(musicId) {
    let music = MusicModel.findById(musicId);
    if (!music) return this;

    if (!this.musics.includes(musicId)) {
        this.musics.push(musicId);
    }

    return this;
};

playlistSchema.methods.removeMusic = function(musicId) {
    let music = MusicModel.findById(musicId);
    if (!music) return this;

    let index = this.musics.indexOf(musicId);
    if (-1 != index) {
        this.musics.splice(index, 1);
    }

    return this;
};

module.exports = mongoose.model('playlist', playlistSchema);
