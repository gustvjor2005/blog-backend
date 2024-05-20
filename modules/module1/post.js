const mysql = require("mysql");
const config = require('config');

const confDB = {
  host : config.get('APP.host'),
  user : "root",
  password : config.get('APP.password'),
  database : config.get('APP.database')
};

const pool = mysql.createPool(confDB);

function sqlPost(req){
  return `INSERT INTO comment(details, section, username, email, day) VALUES ("${req.body.details}", "${req.body.section}", "${req.body.username}", "${req.body.email}", now()) `;
}

module.exports = function(app, router) {
  router.route("/comment").post((request, response) => {
    console.log("Router recibe POST.");	
    const sql = sqlPost(request);
    pool.query(sql, (err, result) => {
      if (err){
        console.log("Error realizando insert en bd");
        return console.error(err.message);
      }	    
      response.json(result);
    });
  });
};