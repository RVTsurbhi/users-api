var con = require('./../model');


exports.login = function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    if(!email){
        res.statusCode = 400;
        res.send({
            "error": "bad_request",
            "error_description": "email is required"
        });

    }else{
        con.query('select * from users where email_id = ?', [email], function(err, result, fields){
            if(err){
                console.log(err);
                res.send({
                    "error": "bad_request",
                    "error_description": "error"
                })
            }else{
                console.log(result);
                if(result.length > 0){
                    if(result[0].password == password){
                        res.json({
                            code :200,
                            data :result,
                            message : "successfully logged in"
                        });
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

// validations
// logic

// response
