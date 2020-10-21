const path = require('path');
const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const PORT = 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'public'))); //set public folder to send our static website
app.use(cors()); // revent same source complains
app.use(express.json()); // parse body and to receive the json data

let map = new Map(); //this will be our placeholder database

// @route GET /
// @desc root route
app.get('/', (req, res) => {
    console.log(`${req.method} | ${req.url} | ${req.headers['user-agent']}`);
});

// @route GET /:alias
// @param alias: name for the shortened url
app.get('/:alias', (req, res) => {
    const { alias } = req.params; //grab parameter alias from url

    const url = map.get(alias); //get matching url to the alias from db
    if (!url) return res.status(400).redirect('/'); //if alias doesn't exist, reload
    res.status(200).redirect(url); // redirect to long url
});

// @route POST /
// @desc register new url and alias
app.post('/', [body('url').isURL()], (req, res) => {
    const errors = validationResult(req); //validate user input
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() }); //return errors if present

    let { url, alias } = req.body; //grab user input from body
    if (!url) return res.status(400).json({ err: 'no url' }); //return error if no url
    if (!alias) {
        alias = Math.random().toString(36).substring(2, 15); //generate "unique" alias if not specified
    }
    map.set(alias, url);
    res.status(200).json(`${req.headers.origin}/${alias}`);
});

app.listen(PORT || 5000, () => {
    console.log('server listening on port ' + PORT);
});
