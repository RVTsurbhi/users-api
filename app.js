var http = require('http');
var fs = require('fs');
var db = require('./model');

var express = require('express');
var bodyParser = require('body-parser');
var forms = require('./controllers/forms');
var login = require('./controllers/login');

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

// api fo login user

app.post('/login', login.login);

// api to get the result of user
app.get('/users/:id', function(req, res){
    db.query('select * from users where id = ?',[req.params.id], 
    function (err, results, fields){
        if(err) throw err;
            res.end(JSON.stringify(results));      
    });
});


app.listen(3000);

