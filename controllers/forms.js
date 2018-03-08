var con = require('./../model');

var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
var pswrdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
exports.register = function(req, res, next){
    var err = [];
    console.log(req.body);
    if(!req.body.username) err.push({msg:'username is required'});

    if(!req.body.email || !emailReg.test(req.body.email)) err.push({msg: 'enter a valid email'});
    
    if(!req.body.password || !pswrdReg.test(req.body.password)) err.push({msg: 'enter a valid password'});
    
    if(err.length){
        res.statusCode = 404;
        res.json({
            error: "bad_request",
            err: err
        })
    }
    else{
      res.statusCode = 200;
      var today = new Date();
      var users = {
        "name":req.body.username,
        "email_id":req.body.email,
        "password":req.body.password,
        "created_at":today,
        "updated_at":today
       }
        con.query('insert into users set ?',users,function(err, result, field){
            if(err){
                console.log(err);
                res.json({
                    error : "bad_request",
                    error_description: " error occur" 
                })
            }else{
                res.json({
                    code:200,
                    data:result,
                    message: 'successfully registered'
                });
            };
        });
    }
    
};