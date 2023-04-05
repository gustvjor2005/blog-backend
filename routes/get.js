const express = require('express')
const cors = require('cors');
const app = express() //call express function
const mysql = require('mysql');
const config = require('config')

//https://shapeshed.com/uncaught-exceptions-in-node/

const conf = {
  host: 'localhost',
  user: 'root',
  password : config.get('APP.password'),
  database : config.get('APP.database')
}

const conn = mysql.createConnection(conf);

var date = new Date()
conn.connect((err) => {
    if (err){
      console.log(date, "Ocurrio error de conexion a la bd ", err);
    } else {
      console.log(date, "Conectado a MYSQL Server");     
    }     
});

app.use(cors())
app.listen(8091, ()=> {
  var date = new Date()
  console.log(date, 'APP escuchando en el puerto 8091')
})

app.get('/api/comment', (rq, rs)=>{
  var date = new Date()
  console.log(date, "Express recibe GET."); 
  const sql_ = sqlGet(rq.get("ind"));
  conn.query(sql_, (err, rs_) => {
    if(err)
      console.error(date, 'Error realizando consulta a bd')
    else
      rs.json(rs_)
  })  
})

function sqlGet(ind){
  return `SELECT * FROM comment WHERE section = "${ind}" ORDER BY day DESC `
}