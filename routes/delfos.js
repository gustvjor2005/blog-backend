const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded( {extented : true} ));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(config.get('APP.port'));

console.log('APP escuchando en el puerto 8091');

router.use((request, response, next) => {
  console.log('Router en uso ...');
  next();
});

var postModule = require('../modules/module1/post');
var getModule = require('../modules/module1/get');

postModule(app, router);
getModule(app);