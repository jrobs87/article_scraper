const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const db = require('./models');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express()
var port = process.env.PORT || 3000;

const path = require('path')
app.use(express.static('public'))

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



// Handlebars
app.engine("handlebars",
  exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");
 
// Routes
// HTML - Home
app.get('/', function (req, res) {
    res.render('home');
});

// HTML - Saved
app.get('/saved', function (req, res) {
  res.render('saved');
});

// API - Scrape
app.get('/api/scrape', function (req, res) {
  res.send('Scrape Articles Route').status(200).end();
});

// API - Clear
app.get('/api/clear', function (req, res) {
  res.send('Clear Articles Route').status(200).end();
});

// API - Add Comment
app.get('/saved', function (req, res) {
  res.render('saved');
});

// API - Delete Comment
app.get('/saved', function (req, res) {
  res.render('saved');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))