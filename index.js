
const express = require('express')
const path = require('path')
const app = express()
const ejs = require('ejs')
const body = require("body-parser");
var utils = require("./mioMonasPellegrino.js");
var data;

app.use(body.urlencoded({ extended: true }))

app.set("view engine", 'ejs')
app.use('/', express.static(__dirname + "/views"));
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  data = utils.leggiFile("./data/tabella.json");
  res.render("index.ejs")
})


app.get('/classifica', (req, res) => {
  data = utils.leggiFile("./data/tabella.json");

  console.log(data);
  res.render("score", { data: data })
})

app.get('/insert', (req, res) => {
  res.render("insert")
})

app.post('/inserisci', (req, res) => {
  console.log(data);
  utils.appendArrayJSON("./data/tabella.json", data, req)
  res.redirect("/");
})

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log("Listening on " + port);
});
