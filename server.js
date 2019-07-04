const express = require('express')
const exphbs  = require('express-handlebars')
const mongoose = require('mongoose')
const cheerio = require('cheerio')
const axios = require('axios')


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
app.get('/', function (req, res) {
    res.render('home');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))