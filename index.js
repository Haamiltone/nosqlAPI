require('dotenv').config({silent:true})
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {loadDb, addRecord, findUserByName, findUserByUsername} = require('./scripts.js')
const app = express();
const port = 9000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key')
    next()
  })

app.use((req, res, next) => {
    const apiKey = req.get('API-Key')
    if(!apiKey || apiKey !== process.env.API_KEY){
        res.status(401).send("You shall no pass")
    } else next()
})


app.get('/',(req, res) => {
    res.send('Hello World!')
})

app.get('/getdb', (req, res) => {
    const db = loadDb();
    res.send(db);
})

app.post('/getuser', (req, res) => {
    // const db = loadDb();
    const username = req.body.username;
    const ret = findUserByUsername(username);
    res.send(ret);

    // res.sendStatus(200); // OK

})

app.post('/adduser', (req, res) => {
    const body = req.body;
    const username = body.username
    const name = body.name
    const surname = body.surname

    const ret = addRecord(username, name, surname);
    console.log(ret)
    res.status(202).send(ret)
    
})

app.listen(port, () =>{
    console.log("App listening on port " + port);
})
