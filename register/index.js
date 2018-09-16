//FUNÇÕES DO EXPRESS ====================
var app = require('express')();  
var http = require('http').Server(app);
var bodyParser = require('body-parser');

//FUNÇÕES PARA POST
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

//http://localhost:3000/methodGet/?baby=nenem&gorgor=sapo
app.get('/methodGet/', function(req, res){  
  console.log(req.query);
  res.sendFile(__dirname + '/methodGet.html');
});

app.post('/methodPost/', function(req, res){  
  console.log(req.body);
  res.sendFile(__dirname + '/methodPost.html');
});

//REDIRECIONAMENTO DA ROTA DO EXPRESS ====================
http.listen(3000, function(){  
  console.log('servidor rodando em localhost:3000');
});