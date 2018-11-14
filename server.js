const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient ;
var db;

// Using Embedded JavaScript (ejs) 
app.set('view engine', 'ejs');

// Adding body-parser to extract data from the <form> element
// and add them to the `body` property in the request object. 
// The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({extended: true}));

// Initiating a MongoClient Connection
MongoClient.connect('mongodb://robert:pearljam1132@ds039321.mlab.com:39321/subgenius', (err, client) => {
    if(err) return console.log(err);
    db = client.db('subgenius');
    app.listen(3000, () => console.log('Listening on 3000'));
});

// app.get(path, callback)
//  // Within the callback, we have (request, response) <= this is our callback.
// app.get('/', (req, res)=> {
//     res.sendFile('/Users/nikhil/Dropbox/Code/node-js-learning/CRUD01' + '/index.html');
// });

// the POST method.
app.post('/quotes', (req, res)=>{
    db.collection('quotes').insertOne(req.body, (err, result) => {
        if(err) return console.log(err);
        console.log('saved to the database, motherfukrrr');
        res.redirect('/');
    });
});

app.get('/', (req, res) =>{
    db.collection('quotes').find().toArray((err, result) => {
        if(err) return console.log(err);
        //render index.ejs here
        res.render('index.ejs', {quotes: result});
    });
    
});
