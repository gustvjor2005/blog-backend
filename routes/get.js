const express = require('express')
const cors = require('cors');
const app = express() //call express function
const mysql = require('mysql');
const config = require('config');
const process = require('process');

//https://shapeshed.com/uncaught-exceptions-in-node/

//const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
var date = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima'
});

process.on('beforeExit', (code) => {
  console.log(date, 'Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log(date, 'Process exit event with code: ', code);
});

console.log(date, 'This message is displayed first.');


const conf = {
  host : config.get('APP.host'),
  user: 'root',
  password : config.get('APP.password'),
  database : config.get('APP.database')
}

const conn = mysql.createConnection(conf);

var date = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima'
});

conn.connect((err) => {
    if (err){
      console.log(date, "Ocurrio error de conexion a la bd ", err);
      return
    } else {
      console.log(date, "Conectado a MYSQL Server");     
    }     
});

app.use(cors())
app.listen(8091, ()=> {
  var date = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima'
});
  console.log(date, 'APP escuchando en el puerto 8091')
})

app.get('/api/comment', (rq, rs)=>{
  var date = new Date().toLocaleString('es-PE', {
    timeZone: 'America/Lima'
  });
  console.log(date, "Express recibe GET."); 
  const sql_ = sqlGet(rq.get("ind"));
  conn.query(sql_, (err, rs_) => {
    if(err){
      console.error(date, 'Error realizando consulta a bd')
      return
    }else{
      rs.json(rs_)
    }

  })  
})

function sqlGet(ind){
  return `SELECT * FROM comment WHERE section = "${ind}" ORDER BY day DESC `
}