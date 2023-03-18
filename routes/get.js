const express = require('express')
const cors = require('cors');
const app = express() //call express function
const mysql = require('mysql');
const config = require('config')

const conf = {
  host: 'localhost',
  user: 'root',
  password : config.get('APP.password'),
  database : config.get('APP.database')
}

const conn = mysql.createConnection(conf);

conn.connect((err) => {
    if (err){
      console.log("Ocurrio error de conexion a la bd ", err);
    } else {
      console.log("Conectado a MYSQL Server");     
    }     
});

app.use(cors())
app.listen(8091, ()=> {
  console.log('APP escuchando en el puerto 8091')
})

app.get('/api/comment', (rq, rs)=>{
  console.log("Express recibe GET."); 
  const sql_ = sqlGet(rq.get("ind"));
  conn.query(sql_, (err, rs_) => {

    if(err)
      console.error('Error realizando consulta a bd')
    else
      rs.json(rs_)
  })  
})

function sqlGet(ind){
  return `SELECT * FROM comment WHERE section = "${ind}" ORDER BY day DESC `
}