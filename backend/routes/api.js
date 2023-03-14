let express = require('express');
let router = express.Router();
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const db = new sqlite3.Database('./develop.db');

const getAllPosts = 'SELECT * FROM POST';
const getPostByPID = 'SELECT * FROM POST WHERE POST_ID = ?';
const getCommentByPID = 'SELECT * FROM COMMENT WHERE POST_ID = ?';
const addPost ='INSERT INTO POST (ACC_ID, Title, Author, Detail) VALUES (?,?,?,?)';
const deletePostByACC_ID = 'UPDATE POST SET Title = "DELETED POST", Author = "DELETED POST", Detail = "DELETED POST" WHERE POST_ID = ?';
const editPostByPID = 'UPDATE POST SET ACC_ID = ?, Title = ?, Author = ?, Detail = ? WHERE POST_ID = ?'
const addComment ='INSERT INTO COMMENT (POST_ID, ACC_ID, Field) VALUES (?,?,?)';
router.post('/auth',function (req,res,next){
    //check if the user is logged in by session
    //if yes, send a 200 status code and username
    console.log(req.session.userId);
    console.log(req.session);
    if(req.session.userId){
        res.status(200).json({
            message:"User is logged in",
            username:req.session.username
        }).send;
        
    }else{
        res.status(201).json({message:"User is not logged in"});
    }
})

router.get('/', function(req, res, next) {   
    db.all(getAllPosts, (err, rows) => {
        if (err) {
            res.status(500).json({message:"Something went wrong with the database"});
        } 
        else if(rows.length === 0){
            res.status(201).json({message:"No posts yet"});
        }
        else{
            res.status(200).json(rows);
        }        
    })
})

router.get('/post/:id', function(req, res, next){
    db.all(getPostByPID, [req.params.id], (err, rows) => {
        if(err){
            res.status(500).json({message:"Something went wrong with the database"});
        }
        else if(rows.length===0){
            console.log("searching for post with id: " + req.params.id);
            res.status(201).json({message:"No such post"});
        }
        else{
            res.status(200).json(rows);
        } 
    })
})

router.post('/post/add', function(req, res, snext){
    //check if the user is logged in by decryting the jwt
    //console.log(req.headers['authorization'])
    let token = req.headers['authorization'].replace('Bearer ', '');

    console.log(token)
    jwt.verify(token, 'hahaha', function(err, decoded) {
        if(err){
            res.status(201).json({message:"User is not logged in"});
        }else{
            console.log(decoded);
            //insert into post table
            console.log(req.body.title);
            console.log(req.body.detail);
            //print sql statement
            console.log(addPost, [decoded.id, req.body.title, decoded.username, req.body.detail]);
            db.get(addPost, [decoded.id, req.body.title, decoded.username, req.body.detail], function(err){
                if(err){
                    res.status(500).json({message:"Something went wrong with the database"});
                }else{
                    res.status(200).json({message:"Post added"})
                }
            })
        }
    });
})

router.post('/post/:id/edit', function(req, res, next){
    // console.log(req.headers['authorization'])
    let token = req.headers['authorization'].replace('Bearer ', '');
    console.log(token);
    jwt.verify(token, 'hahaha', function(err, decoded) {
        if(err){
            res.status(201).json({message:"User is not logged in"})
        }else{
            console.log(decoded);
            //insert into post table
            console.log("user id:", decoded.id);
            //print sql statement
            //檢測是否為作者
            console.log(req.params.id)
            db.all(getPostByPID, [req.params.id], (err, rows)=>{
                if(err){
                    res.status(500).json({message:"Something went wrong with the database"});
                }
                else if(rows.length === 0){
                    console.log("searching for post with id: " + req.params.id);
                    res.status(201).json({message:"No such post"});
                }
                else{
                    if(rows[0].ACC_ID === decoded.id){
                        db.run(editPostByPID, [decoded.id, req.body.title, decoded.username, req.body.detail, req.params.id], (err) => {
                            if(err){
                                res.status(500).json({message:"Something went wrong with the database"});
                            }else{
                                res.status(200).json({message:"Post edited"});
                            }
                        })
                    }
                    else{
                        res.status(201).json({message:"You are not the author of this post"})
                    }
                }
            })
        }
    });
})

router.delete('/post/:id', function(req, res, next){
    // console.log(req.headers['authorization'])
    let token = req.headers['authorization'].replace('Bearer ', '');
    console.log(token);
    jwt.verify(token, 'hahaha', function(err, decoded) {
        if(err){
            res.status(201).json({message:"User is not logged in"})
        }else{
            console.log(decoded);
            //insert into post table
            console.log("user id:", decoded.id);
            //print sql statement
            //檢測是否為作者
            db.all(getPostByPID, [req.params.id], (err, rows)=>{
                if(err){
                    res.status(500).json({message:"Something went wrong with the database"});
                }
                else if(rows.length === 0){
                    console.log("searching for post with id: " + req.params.id);
                    res.status(201).json({message:"No such post"});
                }
                else{
                    if(rows[0].ACC_ID === decoded.id){
                        db.run(deletePostByACC_ID, [req.params.id], (err) => {
                            if(err){
                                res.status(500).json({message:"Something went wrong with the database"});
                            }else{
                                res.status(200).json({message:"Post deleted"});
                            }
                        })
                    }
                    else{
                        res.status(201).json({message:"You are not the author of this post"})
                    }
                }
            })
        }
    });
})

// router.route('/post/:id')
//     .put(function(req, res, next){
//             // console.log(req.headers['authorization'])
//             let token = req.headers['authorization'].replace('Bearer ', '');
//             console.log(token);
//             jwt.verify(token, 'hahaha', function(err, decoded) {
//                 if(err){
//                     res.status(201).json({message:"User is not logged in"})
//                 }else{
//                     console.log(decoded);
//                     //insert into post table
//                     console.log("user id:", decoded.id);
//                     //print sql statement
//                     //檢測是否為作者
//                     console.log(req.params.id)
//                     db.all(getPostByPID, [req.params.id], (err, rows)=>{
//                         if(err){
//                             res.status(500).json({message:"Something went wrong with the database"});
//                         }
//                         else if(rows.length === 0){
//                             console.log("searching for post with id: " + req.params.id);
//                             res.status(201).json({message:"No such post"});
//                         }
//                         else{
//                             if(rows[0].ACC_ID === decoded.id){
//                                 db.run(editPostByPID, [decoded.id, req.body.title, decoded.username, req.body.detail, req.params.id], (err) => {
//                                     if(err){
//                                         res.status(500).json({message:"Something went wrong with the database"});
//                                     }else{
//                                         res.status(200).json({message:"Post edited"});
//                                     }
//                                 })
//                             }
//                             else{
//                                 res.status(201).json({message:"You are not the author of this post"})
//                             }
//                         }
//                     })
//                 }
//             });
//         })

router.get('/post/:id/comments',function(req,res,next){ 
    db.all(getCommentByPID, [req.params.id], (err,rows)=>{
        if(err){
            res.status(500).json({message:"Something went wrong with the database"});
        }
        else if(rows.length === 0){//search for comments using POST_ID
            console.log("searching for comments of post: " + req.params.id)
            res.status(201).json({message:"No comments yet"})
        }
        else{
            res.status(200).json(rows);
        } 
    })
})

router.post('/post/:id/addcomments',function(req,res,next){ 
    let token = req.headers['authorization'].replace('Bearer ', '');
    console.log(token)
    jwt.verify(token, 'hahaha', function(err, decoded) {
        if(err){
            res.status(201).json({message:"User is not logged in"});
        }else{
            console.log(decoded);
            //insert into comment table
            console.log(req.body.detail);
            //print sql statement
            console.log(addComment, [req.params.id, decoded.id, req.body.detail]);
            db.get(addComment, [req.params.id, decoded.id, req.body.detail], function(err){
                if(err){
                    res.status(500).json({message:"Something went wrong with the database"});
                }else{
                    res.status(200).json({message:"Comment added"})
                }
            })
        }
    });
})

module.exports = router;