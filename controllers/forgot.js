var con = require('./../model');
var mailer = require('nodemailer');


exports.forgot_pswrd = function(req, res){
    var email = req.body.email;
    if(!email){
        // error
        res.statusCode = 400;
        res.send({
            "error": "bad_request",
            "error_description": "email is required"
        })
    }else{
        var token = "fdsafdf43254";
        con.query('update users set reset_password_token=? where email_id=?', [token , email], function(err, result){
            if(err){ //err due to wrong query
                console.log(err);
                res.statusCode = 500;
                res.send({
                    "error": "internal_server_error",
                    "error_description": "error"
                });            
            }else if(result.affectedRows){
                // send email
                var url = "view/reset.ejs?token="+token;
                var message = "To reset your password, click the link here. "
                +url;
            }else{
                // email doesn't exist 400
                res.statusCode = 400;
                res.send({
                    "error": "bad_request",
                    "error_description" : "email does not exist"
                });

            }
        });

    }
   
}