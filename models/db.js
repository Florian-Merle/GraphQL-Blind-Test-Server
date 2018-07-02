const mongoose = require('mongoose');

// db connection
mongoose.connect(process.env.MONGODB)

mongoose.connection.once('open', () => console.log('Connected to mongodb'));
mongoose.connection.on('error', error => console.log('Error with mongodb: ' + error));

// get schemas & models
require('./playlistModel');
