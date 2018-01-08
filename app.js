// import modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var routes = require("./controllers/routes");
var database = require("./config/database");

// connect to db
database.startDb();

//set up middleware

//static serving
app.use(express.static("public"));

//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

//set up routes
app.use("/students", routes); 

app.get("/", (req, res) => {
	res.redirect("/students");
}); // because there is no "/", I redirect to my main page which is /students

//set up error middleware
app.use(function(req, res, next){
	res.statusCode = 404;
	res.end("page doesnt exist!");
});

//start server
// app.listen(3000, () => {
// 	console.log("server is listening on port 3000");
// });


app.set( 'port', ( process.env.PORT || 3000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });

