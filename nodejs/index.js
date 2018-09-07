//FUNÇÕES ====================
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mysql',
    database : 'magicraft'
  });
  var md5 = require('md5');

//EXPRESS ====================

  app.use(express.static('public'));

  //Essa é a rota para que o express redirecione o nosso arquivo index.html
  app.get('/', function(req, res, next){  
    res.sendFile(__dirname + '/index.html');
  });

//FUNÇÕES DO SOCKET.IO ====================
  var character = {};
    //teste
      character['sapo'] = {};
      character['sapo']['name'] = 'odd_gus';
      character['sapo']['who'] = '#'+character['sapo']['name'];
      character['sapo']['column'] = 7;
      character['sapo']['row'] = 4;
      character['sapo']['item'] = {};
    //teste
  io.on('connection', function(socket){
    var user = {};
    socket.on('login', function(login){
      user['email'] = login['email'];
      user['password'] = md5(login['password']);
      user['selection'] = "SELECT `id`,`user` FROM `MC_USER` WHERE `email` = '"+user['email']+"' AND `password` = '"+user['password']+"' LIMIT 1";
      connection.query(user['selection'], function (error, results, fields) {
       if (error) {
          throw error;
        } else {
          if(results!=''){
            user['logged'] = false;
            user['name'] = results[0]['user'];
            user['id'] = results[0]['id'];
            if(typeof(character[user['name']])!=="undefined"&&character[user['name']]!==null){
              user['logged'] = true;
            }
            if(user['logged'] == false){
              var me = user['name'];
              character[me] = {};
              character[me]['id'] = user['id'];
              character[me]['name'] = me;
              character[me]['who'] = '#'+character[me]['name'];
              character[me]['item'] = {};
              //items
                character[me]['item']['upper-body'] = 'cloak';
                character[me]['item']['hair'] = 'chanel';
              socket.emit('start',{
                user:me,
                character:character
              });
            } else {
              socket.emit('failed login', 'Usuário logado em outra janela');
            }
          } else {
            socket.emit('failed login', 'Email ou senha incorretos');
          }
        }
      });
    });
    socket.on('update user', function(data){
      if(data['action']=='place'){
        character[data['user']] = data['data'];
        io.sockets.emit('place',{user:data['user'],character:character[data['user']]});
      } else if(data['action']=='up'){
        character[data['user']] = data['data'];
        socket.broadcast.emit('up',{user:data['user'],character:character[data['user']]});
      } else if(data['action']=='down'){
        character[data['user']] = data['data'];
        socket.broadcast.emit('down',{user:data['user'],character:character[data['user']]});
      } else if(data['action']=='right'){
        character[data['user']] = data['data'];
        socket.broadcast.emit('right',{user:data['user'],character:character[data['user']]});
      } else if(data['action']=='left'){
        character[data['user']] = data['data'];
        socket.broadcast.emit('left',{user:data['user'],character:character[data['user']]});
      } else if(data['action']=='position'){
        character[data['user']] = data['data'];
        socket.broadcast.emit('position',{user:data['user'],character:character[data['user']]});
      } else if(data['action']=='jump'){
        io.sockets.emit('jump',{user:data['user'],character:character[data['user']]});
      } else if(data['action']=='sit'){
        character[data['user']] = data['data'];
        io.sockets.emit('sit',{user:data['user'],character:character[data['user']]});
      }
    });
    socket.on('message', function(message){
      io.sockets.emit('message',user['name']+' '+message);
    });
    socket.on('disconnect', function(){
      io.sockets.emit('delete',user['name']);
      delete character[user['name']];
    });
  });

//REDIRECIONAMENTO EXPRESS ====================
  //Aqui é onde o index.html será redirecionado
  http.listen(3000, function(){  
    //console.log('servidor rodando em localhost:3000');
  });
