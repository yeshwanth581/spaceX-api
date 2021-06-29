/* Variables initialization */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');

const spaceXRouter = require('./routes/spaceX');
const app = express();

//added for cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  // ended
  
/* Logging setup */
app.use(logger('dev'));
app.use(logger('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

/* Middlewares for processing the request */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('/', function (req, res, next) {
  res.status(200).json({"service_name": "spaceX"})
  next();
})

app.use('/spaceX', spaceXRouter);

module.exports = app;
