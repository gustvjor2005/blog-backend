var mysql = require("mysql");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('config');

const conf = {
	     host : "localhost",
	     user : "root",
	     password : config.get('APP.password'),
	     database : config.get('APP.database')
	  };

const conn = mysql.createConnection(conf);

conn.connect((err) => {
    if (err){
      console.log("Error courrred", err);
    } else {
      console.log("Connected to MYSQL Server");	    
    }	    

});

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded( {extented : true} ));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

var port = 8090;
app.listen(port);

console.log('Api in running at '+ port);

router.use((request, response, next) => {
  console.log('router.use ...');
  next();
});

//GET method
router.route("/comment").get((request, response) => {
  console.log("Route GET.")
  const sql_ = sqlGet(request.get("ind"));
  conn.query(sql_, (err, result) => {
    if(err){
      console.log("Error ...!");
      return console.error(err.message)
    }	    
    response.json(result);
  });
});	

//POST method
router.route("/comment").post((request, response) => {
  console.log("Route POST.");	
  const sql = sqlPost(request);
  conn.query(sql, (err, result) => {
    if (err){
      console.log("Error ...!");
      return console.error(err.message);
    }	    
    response.json(result);
  });
});

function sqlPost(req){
  return `INSERT INTO comment(details, section, username, email, day) VALUES ("${req.body.details}", "${req.body.section}", "${req.body.username}", "${req.body.email}", now()) `;
}

function sqlGet(ind){
  return `SELECT * FROM comment WHERE section = "${ind}" ORDER BY day DESC `
}


