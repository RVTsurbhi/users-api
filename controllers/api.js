// var con = require('./../model');
// var random_key = require('./functions');
// const { check, validationResult } = require('express-validator/check');
// const { matchedData, sanitize } = require('express-validator/filter');
// var email = req.body.email;
// var password = req.body.password;
// var name = req.body.name;
// var id = req.body.id;
// var newpassword = req.body.newpassword;

// exports.register = function(req, res, next){

//     check('password','enter a valid password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
//     check('password','this field is required').notEmpty();
//     check('email','invalid email').matches(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
//     check('email','email is required').isEmail();
//     check('name','username is required').notEmpty();

//     var err = [];   
//     if(err.length){
//         res.statusCode = 404;
//         res.send({
//             error: "bad_request",
//             err: err
//         })
//     }
//     else{
//       res.statusCode = 200;

//         con.query('insert into users set [name, email, password] values (?,?,?)',[name, email, password],function(err, result, field){
//             if(err){
//                 console.log(err);
//                 res.json({
//                     error : "bad_request",
//                     error_description: " error occur" 
//                 })
//             }else{
//                 res.json({
//                     code:200,
//                     data:result,
//                     message: 'successfully registered'
//                 });
//             };
//         });
//     }
    
// };
// //login
// exports.login = function (req, res){

    
//     if(!email){
//         res.statusCode = 400;
//         res.send({
//             "error": "bad_request",
//             "error_description": "email is required"
//         });

//     }else{
//         con.query('select * from users where email_id = ?', [email], 
//         function(err, result, fields){
//             if(err){
//                 res.statusCode = 500;
//                 res.send({
//                     "error": "internal_server_error",
//                     "error_description": "error"
//                 });
//             }else{
//                 console.log(result);
//                 if(result.length > 0){
//                     if(result[0].password == password){ var id = req.body.id;

//                         var session_id = random_key.random_key();

//                         con.query('insert into sessions set id =?, user_id=?',[session_id, result[0].id], 
//                         function(err, result){
//                             console.log(result);
//                             if(err){
//                                 console.log(err);
//                             }else{
//                                 res.send({
//                                     session_id : session_id
//                                 });
//                             }
                            
//                         })                       
//                     }else{
//                         res.send({
//                             "error": "bad_request",
//                             "error_description": "password is wrong"                      
//                         });
//                     }
//                 }
//                 else{
//                     res.statusCode = 400;
//                     res.send({
//                         "error": "bad_request",
//                         "error_description" : "email does not exist"
//                     });
//                 }
//             }
//         });

//     }

    
// }

// //update

// exports.updation = function(req, res, ){

//     if(!name || !id){
//         res.statusCode = 400;
//         res.send({
//             "error": "bad_request",
//             "error_description": "all params are required"
//         });
//     }
//     else{
//       res.statusCode = 200;
//       var today = new Date();
//         con.query('update `users` set name = ? where id=?',
//         [req.body.name, req.body.id],
//         function(err, result, field){
//             if(err){
//                 console.log(err);
//                 res.statusCode = 500;
//                 res.send({
//                     "error": "internal_server_error",
//                     "error_description": "error"
//                 });
//             }else{
//                 if(result.affectedRows){
//                     res.json({
//                         code:200,
//                         data:result,
//                         message: 'successfully updated'
//                     });
//                 }else{
//                     res.statusCode = 400;
//                     res.send({
//                         "error": "bad_request",
//                         "error_description": "username is wrong"                      
//                     });
//                 }
//             };
//         });
//     }
    
// };

// //change
// exports.change = function(req, res){

//     if(!id || !password || !newpassword){
//         res.statusCode = 400;
//         res.send({
//             "error": "bad_request",
//             "error_description": "all params are required"
//         });
//     }else{
//         con.query('update users set password =? where id =? and password =?', [newpassword, id, password], 
//         function(err, result, fields){
//             if(err){
//                 console.log(err);
//                 res.statusCode = 500;
//                 res.send({
//                     "error": "internal_server_error",
//                     "error_description": "error"
//                 });
//             } else{
//                 if(result.affectedRows){
//                     res.json({
//                         code:200,
//                         data:result,
//                         message: 'successfully updated'
//                     });
//                 }else{
//                     res.statusCode = 400;
//                     res.send({
//                         "error": "bad_request",
//                         "error_description": "id and Old password is wrong"                      
//                     });
//                 }
//             }
            
//         });
//     }
// };

