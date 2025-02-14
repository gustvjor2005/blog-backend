const mysql = require("mysql");
const config = require("config");

const confDB = {
  host: config.get("APP.host"),
  user: config.get("APP.user"),
  password: config.get("APP.password"),
  database: config.get("APP.database"),
};

const pool = mysql.createPool(confDB);

function sqlGet(ind) {
  return `SELECT * FROM comment WHERE section = "${ind}" ORDER BY day DESC `;
}

module.exports = (app) => {
  app.get("/api/comment", (rq, rs) => {
    var date = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
    });
    console.log(date, "Router recibe GET.");
    const sql_ = sqlGet(rq.get("ind"));
    pool.query(sql_, (err, rs_) => {
      if (err) {
        console.error(date, "Error realizando consulta a bd");
        return;
      } else {
        rs.json(rs_);
      }
    });
  });
};
