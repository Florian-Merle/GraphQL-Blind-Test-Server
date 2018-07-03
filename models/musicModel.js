const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    name: String,
    url: String,
});

module.exports = mongoose.model('music', musicSchema);
