var http = require('http');
var fs = require('fs');
var db = require('./model');

var express = require('express');
var bodyParser = require('body-parser');
var forms = require('./controllers/forms');
var login = require('./controllers/login');
var update = require('./controllers/update');
var change = require('./controllers/change');
var forgot = require('/controllers/forgot');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var urlencodedParser = bodyParser.urlencoded({ extended: true })

//api for signup user
app.get('/', function(req, res){
    res.render('index');
});

app.post('/index',urlencodedParser, forms.register);

// api for login user

app.post('/login', login.login);

// api to get the result of user
app.get('/users/:id', function(req, res){
    db.query('select * from users where id = ?',[req.params.id], 
    function (err, results, fields){
        if(err) throw err;
            res.end(JSON.stringify(results));      
    });
});

//update the user profile
app.put('/id', update.updation);

//change password
app.post('/change/pswrd', change.change);

//forgot password
// app.post('');

app.listen(3000);

