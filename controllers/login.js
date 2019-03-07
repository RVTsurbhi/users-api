var con = require('./../model');
var random_key = require('./functions');

exports.login = function (req, res){

    // var body = {
    //     email:{
    //         value: req.body.email,
    //         required :1
    //     },

    //     password:{
    //         value: req.body.password || null,
    //         require: 1
    //     }
    // }
    var email = req.body.email;
    var password = req.body.password;
    
    if(!email){
        res.statusCode = 400;
        res.send({
            "error": "bad_request",
            "error_description": "email is required"
        });

    }else{
        con.query('select * from users where email_id = ?', [email], 
        function(err, result, fields){
            if(err){
                res.statusCode = 500;
                res.send({
                    "error": "internal_server_error",
                    "error_description": "error"
                });
            }else{
                console.log(result);
                if(result.length > 0){
                    if(result[0].password == password){

                        var session_id = random_key.random_key();

                        con.query('insert into sessions set id =?, user_id=?',[session_id, result[0].id], 
                        function(err, result){
                            console.log(result);
                            if(err){
                                console.log(err);
                            }else{
                                res.send({
                                    session_id : session_id
                                });
                            }
                            
                        })                       
                    }else{
                        res.send({
                            "error": "bad_request",
                            "error_description": "password is wrong"                      
                        });
                    }
                }
                else{
                    res.statusCode = 400;
                    res.send({
                        "error": "bad_request",
                        "error_description" : "email does not exist"
                    });
                }
            }
        });

    }

    
}   

