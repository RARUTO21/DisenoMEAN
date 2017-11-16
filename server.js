var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
//var morgan = require("morgan");
const path  = require("path");
//const http = require("http");
var fs = require('fs');
//var index = fs.readFileSync('./src/index.html');
//var ejs = require('ejs');

var USERS_COLLECTION = "users";
var ITEMS_COLLECTION = "items";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname,'src/index.html'));
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

  /*
  var usuarios = [];

  db.collection(USERS_COLLECTION).find({},{_id : true }).toArray(function(err, result)  {

    if (err) throw err;

    console.log(result);
    for (element in result){
      console.log("valor de element: "+element);
      console.log("valor de result[0]: "+result[element]._id);
      usuarios.push(result[element]._id);
    }
    console.log("Los elementos en usuarios son: " + usuarios);
    db.close();
  });

  http.createServer(function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    //since we are in a request handler function
    //we're using readFile instead of readFileSync
    fs.readFile('./src/index.html', 'utf-8', function(err, content) {
      if (err) {
        res.end('error occurred while reading index.html');
        return;
      }

      var renderedHtml = ejs.render(content, {users: usuarios});  //get redered HTML code
      res.end(renderedHtml);
    });
  });*/




  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

app.get("/api/users", function(req, res) {
  db.collection(USERS_COLLECTION).find().toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/api/items", function(req, res) {
  db.collection(ITEMS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get items.");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.get("/api/users/:id", function(req, res) {
  db.collection(USERS_COLLECTION).findOne({ _id: req.params.id }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/users/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(USERS_COLLECTION).updateOne({_id: req.params.id}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.get("/api/items/:id", function(req, res) {
  db.collection(ITEMS_COLLECTION).findOne({ _id: req.params.id }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get item");
    } else {
      res.status(200).json(doc);
    }
  });
});
