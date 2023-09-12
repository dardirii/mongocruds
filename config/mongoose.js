const mongoose = require('mongoose');

mongoose.connect('mongodb://master:123@localhost:27017/edu-mongoose?authSource=admin')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => console.log('sever database terhubung'))