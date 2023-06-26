const express = require('express');
const { connectToDb, getDb } = require('./db');

// init app and middleware
const app = express();

// db connection
let db

connectToDb( (err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        app.listen(3000, () => {
            console.log('app listening on port 3000');
        });
        db = getDb();
    }
});

// routes

app.get('/books', (req, res) => {
    let books = []

    db.collection('books')
        .find() //returns a cursor. use method toArray or forEach
        .sort( {author: 1 })
        .forEach(book => books.push(book))
        .then( () => {
            res.status(200).json(books)
        })
        .catch( () => {
            res.status(500).json( {error: 'Could not fetch the documents'})
        })

    //res.json({mssg: "Welcome to the API"});
});