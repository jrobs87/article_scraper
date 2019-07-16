const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const db = require('./models');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express()
var port = process.env.PORT || 3000;

const path = require('path')
app.use(express.static('public'))

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Handlebars
app.engine("handlebars",
  exphbs({ defaultLayout: "main" })
);
app.set("view engine", "handlebars");

// Routes
// HTML - Home
app.get('/', function (req, res) {
  db.Article.find(function (err, data) {
    if (data.length === 0) {
      console.log('/ route hit - no articles saved.');
    }
    res.render('home', { data: data });
  })
});

// HTML - Saved
app.get('/saved', function (req, res) {
  res.render('saved');
});

// API - Scrape
app.get('/api/scrape', function (req, res) {
  // getting html body 
  axios.get("https://www.futurity.org/category/science-technology/")
    .then((response) => {
      console.log('Connected to target URL');
      var $ = cheerio.load(response.data);
      console.log('Cheerio!');
      // Now, we grab every h2 within an article tag, and do the following:
      $("a:first-child").each(function (i, element) {
        const result = {};
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).attr('title');
        result.link = $(this).attr('href');
        // check for titles too short to be article headlines (halth and science were being included, etc)
        if (result.title && result.link.length > 60) {
          // Create a new Article using the `result` object built from scraping
          db.Article.create(result)
            .then(function (dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function (err) {
              // If an error occurred, log it
              console.log(err);
            });
        }
      })
    })
    .then(() => res.redirect('/'))
    .catch(function (err) {
      // If an error occurred, log it
      // console.log(err);
      console.log('Error occurred.  Scrape failed.');
    })
});


// API - Clear
app.get('/api/clear', function (req, res) {
  // drop the model Article from the collection
  db.Article.remove({}, function (err) {
    console.log('collection removed')
  });
  // send back home
  res.redirect('/').status(200).end();
});

// API - Add Comment
app.post('/api/note-new', function (req, res) {
  console.log('New note added')
  // res.render('saved');
  res.send('New Note')
});

// API - Delete Comment
app.delete('/api/note-delete', function (req, res) {
  console.log('Note deleted')
  res.render('saved');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))