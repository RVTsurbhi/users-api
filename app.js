var http = require('http');
var fs = require('fs');
var db = require('./model');

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
var middle = require('./controllers/middleware');
var forms = require('./controllers/forms');
var login = require('./controllers/login');
var update = require('./controllers/update');
var change = require('./controllers/change');
var forgot = require('./controllers/forgot');


var app = express();

app.set('view engine', 'ejs');

// app.use(session({secret: 'hola'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(expressValidator());
// app.use(middle.authUser());

//api for signup user
app.get('/', function(req, res){
    res.render('index');
});

app.post('/index',forms.register);
// app.use(forms.register)

// api for login user

app.post('/login', login.login);


// api to get the result of user
app.get('/users/:id', middle.authUser, function(req, res, next){
    db.query('select * from users where id = ?',[req.params.id], 
    function (err, results, fields){
        if(err) {
            res.send({
                "error": "bad_request",
                "error_description": "error"
            })
        }else{
            res.json({
                code:200,
                data:result,
                message: 'success'
            });
        }   next(); 
    });
});

//update the user profile
app.put('/id', update.updation);

//change password
app.post('/change/pswrd', change.change);

//forgot password
app.post('/forgot/pswrd', forgot.forgot_pswrd);

 
// app.post('/index', forms.register, function(req,res){
 

// });

app.listen(3000);

