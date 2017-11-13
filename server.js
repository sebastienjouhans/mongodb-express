const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}));

const MONGO_URL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@ds261745.mlab.com:61745/notetaker';

var db;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/notetaker', (req, res) => {

    // Do something with db here, like inserting a record
    db.collection('notes').insertOne(
        req.body,
        (err, res) => {
        if (err) {
            db.close();
            return console.log(err);
        }
        // Success
        db.close();
    });
    res.redirect('/');
});




MongoClient.connect(MONGO_URL, (err, database) => {  
    if (err) {
        return console.log(err);
    }
    db = database;
    app.listen(3000, () => {
        console.log('listening on 3000');
    });  
});