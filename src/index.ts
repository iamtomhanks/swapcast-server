// Modules
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

import { Request, Response, Application, NextFunction } from 'express';
const app = express();

// const path = require('path');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,GET,POST");
  next();
});

const connection = mysql.createConnection({
  host     : `${process.env.DB_HOST}`,
  user     : `${process.env.DB_USER}`,
  password : `${process.env.DB_PASSWORD}`,
  database : `${process.env.DB_DATABASE}`
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);

  // Routes
  require('./Routes/Auth')(app, connection);
});

app.listen(3001);
console.log('Listening on port 3001');
