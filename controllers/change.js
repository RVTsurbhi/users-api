var con = require('./../model');


exports.change = function(req, res){
    var id = req.body.id;
    var password = req.body.password;
    var newpassword = req.body.newpassword;

    if(!id || !password || !newpassword){
        res.statusCode = 400;
        res.send({
            "error": "bad_request",
            "error_description": "all params are required"
        });
    }else{
        con.query('update users set password =? where id =? and password =?', [newpassword, id, password], 
        function(err, result, fields){
            if(err){
                console.log(err);
                res.statusCode = 500;
                res.send({
                    "error": "internal_server_error",
                    "error_description": "error"
                });
            } else{
                if(result.affectedRows){
                    res.json({
                        code:200,
                        data:result,
                        message: 'successfully updated'
                    });
                }else{
                    res.statusCode = 400;
                    res.send({
                        "error": "bad_request",
                        "error_description": "Old password is wrong"                      
                    });
                }
            }
            
        });
    }
};