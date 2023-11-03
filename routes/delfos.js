var mysql = require("mysql");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('config');

const conf = {
	     host : config.get('APP.host'),
	     user : "root",
	     password : config.get('APP.password'),
	     database : config.get('APP.database')
	  };

const conn = mysql.createConnection(conf);

conn.connect((err) => {
    if (err){
      console.log("Ocurrio error en conexion mysql", err);
    } else {
      console.log("Conectado a MYSQL Server");	    
    }	    
});

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded( {extented : true} ));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(8090);

console.log('APP escuchando en el puerto 8090');

router.use((request, response, next) => {
  console.log('Router en uso ...');
  next();
});

//POST method
router.route("/comment").post((request, response) => {
  console.log("Router recibe POST.");	
  const sql = sqlPost(request);
  conn.query(sql, (err, result) => {
    if (err){
      console.log("Error realizando insert en bd");
      return console.error(err.message);
    }	    
    response.json(result);
  });
});

function sqlPost(req){
  return `INSERT INTO comment(details, section, username, email, day) VALUES ("${req.body.details}", "${req.body.section}", "${req.body.username}", "${req.body.email}", now()) `;
}