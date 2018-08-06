var express = require('express');
var todoController = require('./controller/todoController');
var mongoose = require('mongoose');
var app = express();

app.set('view engine','ejs');


//static file
app.use(express.static('./public'));

//fire controller 

todoController(app);



app.listen(process.env.PORT);
console.log("server is Running")



 