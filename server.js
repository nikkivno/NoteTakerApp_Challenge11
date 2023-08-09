const express = require('express');
const path = require('path')

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) =>
res.sendFile(path.join('/public/notes.html'))
);

// GET Request for notes

 app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request recieved to get notes`);

    console.info(`${req.method} request recieved to get notes`);
 });

// POST Request for notes 

app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request recieved to add a note`);

    console.info(`${req.method} request recieved to add a note`);
});
