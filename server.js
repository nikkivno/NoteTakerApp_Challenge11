const express = require('express');

const PORT = 3001;

const app = express();


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
