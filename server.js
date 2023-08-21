const fs = require('fs');
const util = require ('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const { v4: uuidv4 } = require('uuid');

const express = require('express');
const path = require('path')

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));


// GET Request for notes

app.get('/api/notes', async(req, res) => {
    let notes = await readFile('./db/db.json', 'utf8');
    notes = JSON.parse(notes);
    console.log(notes);
    res.json(notes);
});

// POST Request for notes 

app.post('/api/notes', async(req, res) => {
    let notes = await readFile('./db/db.json', 'utf8');
    notes = JSON.parse(notes);
    req.body.id = uuidv4();
    notes.push(req.body);
    console.log(req.body);

    await writeFile('./db/db.json', JSON.stringify(notes));

    res.json(notes);
});

app.delete('/api/notes/:id', async(req, res) =>{
    console.log(req.params.id);
    let notes = await readFile('./db/db.json', 'utf8');
    notes = JSON.parse(notes);

    const filteredNotes = notes.filter((note) => note.id !== req.params.id);
    console.log(filteredNotes);

    await writeFile('./db/db.json', JSON.stringify(filteredNotes));
    res.json(filteredNotes);
})

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
    console.log(`Note Taker app listening at http://locathost:${PORT}`);
});
