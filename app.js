const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./develop.db');
const loginAccount = 'SELECT * FROM ACCOUNT WHERE ACC_UN = ? AND ACC_PW = ?';
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const corsConfig = {
    credentials: true,
    origin: true,
};
   
app.use(cors(corsConfig))
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
//=======================================================
console.log('Console says hi!')
app.get('/', function (req, res) {
    res.send('Hello World!');
    db.each(loginAccount, req.body.username,req.body.username, function (err, row) {
        console.log('Welcome '+row.username);
    });
    db.run(loginAccount, [req.body.username,req.body.username]);
});

module.exports = app;
