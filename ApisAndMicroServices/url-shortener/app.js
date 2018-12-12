'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var validUrl = require('valid-url');
var cors = require('cors');
const bodyParser = require('body-parser');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$&');

//Imports the router
const link = require('./routes/link.route');

//Initialize express app
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** SET UP THE DB CONNECTION**/ 
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

let filepath = __dirname + "/views/index.html";
app.get("/", (req, res) => { res.sendFile(filepath); });
app.use('/api/shorturl', link);
app.listen(port, function () {
  console.log('Node.js listening ...');
});