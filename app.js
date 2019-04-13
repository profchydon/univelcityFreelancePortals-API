const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const db = require('./config/keys').mongoURI;  //db config

const app = express();

var graduateRouter = require('./routers/graduateRouter');
var employerRouter = require('./routers/employerRouter')

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});

app.use(express.json());
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: false }));

//enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods: POST, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//connecting to mongoose database
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/freelancePortal', { useNewUrlParser: true });
mongoose.connect(db, {useNewUrlParser: true }).then(() => console.log('Mongo db connected'));

//Routes which should handle requests
app.use('/graduate', graduateRouter);
app.use('/employer', employerRouter);

module.exports = app;