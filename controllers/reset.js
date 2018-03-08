var con = require('./../model');

exports.reset_pswrd = function(req, res){
    var password = req.body.password;
    var pswrd_token = req.body.reset_password_token;
    var email = req.body.email;
    
    con.query('update users set password = ? where reset_password_token = ?', [password, pswrd_token],
    function(err, result, fields){
        if(err){
            res.statusCode = 500;
                res.send({
                    "error": "internal_server_error",
                    "error_description": "error"
                });       
        }else{
            res.json({
                code :200,
                data :result,
                message : "successfully logged in"
            });


        }

    })
}