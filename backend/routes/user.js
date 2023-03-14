//url 要加 /user
const express = require('express');
const session = require('express-session');
const router = express.Router();
const md5 = require('md5');
const { token } = require('morgan');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./develop.db');
const jwt = require("jsonwebtoken");

const findUser = 'SELECT * FROM ACCOUNT WHERE ACC_UN = ?';
const listUserPost = 'SELECT * FROM POST WHERE ACC_ID = ?';
const registerAccount = 'INSERT INTO account (ACC_UN, ACC_PW_MD5) VALUES (?, ?)';

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/cool', function(req, res, next) {
//   res.send('cool');
// });

//view all the posts from the specific logged-in user(get ACC_ID)
router.get('/',function(req, res, next){
    let userId = req.session.userId;
    console.log('ACC_ID =', userId);
    //userId = ACC_ID in database
    db.all(listUserPost,[userId],(err,rows)=>{
        if(err){
            res.status(500).json({message:"Something went wrong with the database"})
        }
        else if(rows.length === 0){
            res.status(201).json({message:"No posts yet"})
        }
        else{
            res.status(200).json(rows);
        }
    })
})

//view all the posts from the specific logged-in user(get POST_ID and other info)
router.post('/',function(req, res, next){
    //decrypt jwt
    //get user id from jwt
    //
    //console.log(req.headers['authorization'])
    let token = req.headers['authorization'].replace('Bearer ', '');

    console.log('jwt token: ', token);
    jwt.verify(token, 'hahaha', function(err, decoded) {
        if(err){
            res.status(201).json({message:"User is not logged in"})
        }
        else{
            console.log(decoded)
            //insert into post table
            console.log(decoded.id)
            //print sql statement
            db.all(listUserPost, [decoded.id], (err, rows)=>{
                if(err){
                    res.status(500).json({message:"Something went wrong with the database"})
                }else{
                    if(rows.length===0){
                        res.status(201).json({message:"No posts yet"})
                    }else{
                        res.status(200).json(rows);
                    }
                }
            });
        }
    });
})

router.post('/create',function(req,res,next){
    let username = req.body.username;
    let password = req.body.password;
    let encryptedPassword = md5(password);
    //try to find if the username is already in the database
    db.get(findUser, [username], (err, row)=>{
        if(err){
            res.status(500).json({message:"Something went wrong with the database"})
        }
        else if(row){
            res.status(201).json({message:"Username already exists"})
        }
        else{
            db.run(registerAccount,[username, encryptedPassword], (err)=>{
                if(err){
                    res.status(500).json({message:"Something went wrong with the database"})
                }
                else{
                    res.status(200).json({message:"Account created"})
                }
            })   
        }
    })
})

module.exports = router;