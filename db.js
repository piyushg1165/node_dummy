require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL
 // const mongoURL = 'mongodb://localhost:27017/hotels';
 const mongoURL = MONGO_URL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected')
});

db.on('disconnected', () => {
    console.log("disconnected")
})

db.on('error', (err) => {
    console.log("error => ",err)
});

module.exports = db;