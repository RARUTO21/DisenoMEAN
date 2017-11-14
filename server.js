var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

//var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

app.get("/", function (req, res) {
  res.send("Hello World!");
  //res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.get("/nombre", function (req, res) {
  res.send("No programado aun! Pero sirve de prueba :P");
});

app.get("/branchprueba", function (req, res) {
  res.send("Esto deberia estar en el branch de prueba que hizo Anthony");
});

app.get("/branchprueba2", function (req, res) {
  res.send("Nueva prueba para nuevo branch");
});


// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://heroku_h2btpplz:95qo9o56gqsfgi6srljkj0a68f@ds155315.mlab.com:55315/heroku_h2btpplz",function (err, database) {//process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

