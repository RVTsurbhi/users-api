// var random_key = require('./functions');
var con = require('./../model');


exports.authUser = function (req, res, next) {
    var user_id = req.body.user_id;
    // var sess_users = login.login();

    con.query('select * from sessions where user_id = ?', [user_id], function(err, result){
        if(err){
            res.statusCode = 500;
            res.send({
                "error": "internal_server_error",
                "error_description": "error"
            });
        }
        else{
            if(result.length){
                res.statusCode = 200;
                res.send(result);
                next();

            }
            else{
                console.log(err);
                res.statusCode = 400;
                res.send({
                    "error": "bad_request",
                    "error_description": "No users found in Database"                      
                });
            }
        }
    });

};