var con = require('./../model');

exports.updation = function(req, res, ){
    var id = req.body.id;
    var name = req.body.name;

    if(!name || !id){
        res.statusCode = 400;
        res.send({
            "error": "bad_request",
            "error_description": "all params are required"
        });
    }
    else{
      res.statusCode = 200;
      var today = new Date();
        con.query('update `users` set name = ? where id=?',
        [req.body.name, req.body.id],
        function(err, result, field){
            if(err){
                console.log(err);
                res.statusCode = 500;
                res.send({
                    "error": "internal_server_error",
                    "error_description": "error"
                });
            }else{
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
                        "error_description": "username is wrong"                      
                    });
                }
            };
        });
    }
    
};