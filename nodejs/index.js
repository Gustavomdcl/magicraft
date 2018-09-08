//FUNÇÕES ====================
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http); 
    //disconnect
      //https://stackoverflow.com/questions/12815231/controlling-the-heartbeat-timeout-from-the-client-in-socket-io
      //https://github.com/socketio/socket.io/issues/2297
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
  var room = {};
  var rooms = [
    'charm',
    'spell',
    'jinx'
  ];
  var maps = [
    'ilha',
    'dark'
  ];
  var logged = {};
  for (var i = rooms.length - 1; i >= 0; i--) {
    room[rooms[i]] = {};
    for (var j = maps.length - 1; j >= 0; j--) {
      room[rooms[i]][maps[j]] = {};
      room[rooms[i]][maps[j]].character = {};
    }
  }
    //teste
      /*room[user['room']][user['map']].character['sapo'] = {};
      room[user['room']][user['map']].character['sapo']['name'] = 'odd_gus';
      room[user['room']][user['map']].character['sapo']['who'] = '#'+room[user['room']][user['map']].character['sapo']['name'];
      room[user['room']][user['map']].character['sapo']['column'] = 7;
      room[user['room']][user['map']].character['sapo']['row'] = 4;
      room[user['room']][user['map']].character['sapo']['item'] = {};*/
    //teste
  io.on('connection', function(socket){
    var user = {};
    user['room'] = rooms[0];
    user['map'] = maps[0];
    socket.on('room', function(data){
      user['room'] = data['room'];
      user['map'] = data['map'];
      socket.join(user['room']+'-'+user['map']);
      socket.emit('room start','go');
    });
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
            if(typeof(logged[results[0]['user']])!=="undefined"&&logged[results[0]['user']]!==null){
              user['logged'] = true;
            }
            if(user['logged'] == false){
              user['name'] = results[0]['user'];
              user['id'] = results[0]['id'];
              var me = user['name'];
              logged[me] = me;
              room[user['room']][user['map']].character[me] = {};
              room[user['room']][user['map']].character[me]['id'] = user['id'];
              room[user['room']][user['map']].character[me]['name'] = me;
              room[user['room']][user['map']].character[me]['who'] = '#'+room[user['room']][user['map']].character[me]['name'];
              room[user['room']][user['map']].character[me]['item'] = {};
              //items
                room[user['room']][user['map']].character[me]['item']['upper-body'] = 'cloak';
                room[user['room']][user['map']].character[me]['item']['hair'] = 'chanel';
              socket.emit('start',{
                user:me,
                character:room[user['room']][user['map']].character
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
        room[user['room']][user['map']].character[data['user']] = data['data'];
        io.sockets.to(user['room']+'-'+user['map']).emit('place',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='up'){
        room[user['room']][user['map']].character[data['user']] = data['data'];
        socket.broadcast.to(user['room']+'-'+user['map']).emit('up',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='down'){
        room[user['room']][user['map']].character[data['user']] = data['data'];
        socket.broadcast.to(user['room']+'-'+user['map']).emit('down',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='right'){
        room[user['room']][user['map']].character[data['user']] = data['data'];
        socket.broadcast.to(user['room']+'-'+user['map']).emit('right',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='left'){
        room[user['room']][user['map']].character[data['user']] = data['data'];
        socket.broadcast.to(user['room']+'-'+user['map']).emit('left',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='up movement'){
        //room[user['room']][user['map']].character[data['user']] = data['data'];
        io.sockets.to(user['room']+'-'+user['map']).emit('up movement',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='down movement'){
        //room[user['room']][user['map']].character[data['user']] = data['data'];
        io.sockets.to(user['room']+'-'+user['map']).emit('down movement',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='right movement'){
        //room[user['room']][user['map']].character[data['user']] = data['data'];
        io.sockets.to(user['room']+'-'+user['map']).emit('right movement',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='left movement'){
        //room[user['room']][user['map']].character[data['user']] = data['data'];
        io.sockets.to(user['room']+'-'+user['map']).emit('left movement',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='position'){
        room[user['room']][user['map']].character[data['user']] = data['data'];
        socket.broadcast.to(user['room']+'-'+user['map']).emit('position',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='jump'){
        io.sockets.to(user['room']+'-'+user['map']).emit('jump',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      } else if(data['action']=='sit'){
        room[user['room']][user['map']].character[data['user']] = data['data'];
        io.sockets.to(user['room']+'-'+user['map']).emit('sit',{user:data['user'],character:room[user['room']][user['map']].character[data['user']]});
      }
    });
    socket.on('message', function(message){
      io.sockets.to(user['room']+'-'+user['map']).emit('message',{user:user['name'],message:message});
    });
    socket.on('disconnect', function(){
      if(typeof(logged[user['name']])!=="undefined"&&logged[user['name']]!==null){
        io.sockets.to(user['room']+'-'+user['map']).emit('delete',user['name']);
        delete room[user['room']][user['map']].character[user['name']];
        delete logged[user['name']];
      }
    });
  });

//REDIRECIONAMENTO EXPRESS ====================
  //Aqui é onde o index.html será redirecionado
  http.listen(3000, function(){  
    //console.log('servidor rodando em localhost:3000');
  });
