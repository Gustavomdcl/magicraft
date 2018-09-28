//OPEN ====================
	var express 	= require('express');
	var app 		= express(); 
	var http 		= require('http').Server(app);
	var bodyParser	= require('body-parser');
	var mysql		= require('mysql');
	var md5			= require('md5');

//MYSQL ====================
	var db = {
		host		: 'localhost',
		user		: 'root',
		password	: 'mysql',
		database	: 'node-login'
	};
	var connection	= mysql.createConnection(db);
	var DATABASE = {
		MC_USER: {
			id			: "INT AUTO_INCREMENT PRIMARY KEY",
			user		: "VARCHAR(255)",
			email		: "VARCHAR(255)",
			password	: "VARCHAR(255)",
			verify		: "VARCHAR(255)"
		},
		MC_USER_STYLE: {
			id			: "INT AUTO_INCREMENT PRIMARY KEY",
			user		: "INT",
			skin		: "VARCHAR(255)",
			head		: "VARCHAR(255)",
			hair		: "VARCHAR(255)",
			face		: "VARCHAR(255)",
			beard		: "VARCHAR(255)",
			neck		: "VARCHAR(255)",
			upperBody	: "VARCHAR(255)",
			torso		: "VARCHAR(255)",
			leftHand	: "VARCHAR(255)",
			rightHand	: "VARCHAR(255)",
			legs		: "VARCHAR(255)",
			feet		: "VARCHAR(255)"
		},
		MC_STYLES: {
			id			: "INT AUTO_INCREMENT PRIMARY KEY",
			category	: "VARCHAR(255)",
			name		: "VARCHAR(255)",
			slug		: "VARCHAR(255)",
			price		: "VARCHAR(255)"
		}
	};
	var TABLE_COUNT = [];
	for(var TABLE in DATABASE){
		TABLE_COUNT.push(TABLE);
	}
	//BUILD DATABASE
	connection.connect(function(error){
		if (error) throw error;
		console.log("Connected!");
		TABLE_CREATION(0);
	});
	function TABLE_CREATION(e){
		var TABLE = TABLE_COUNT[e];
		var TABLE_VERIFY = "SELECT count(*) FROM information_schema.TABLES WHERE (TABLE_SCHEMA = '"+db['database']+"') AND (TABLE_NAME = '"+TABLE+"')";
		connection.query(TABLE_VERIFY, function (error, result){
			if (error) throw error;
			if(result[0]['count(*)']==0){
				var sql = "CREATE TABLE "+TABLE+" (";
				var i = 0;
				for(var COLUMN in DATABASE[TABLE]){
					if(i!=0){
						sql += ", ";
					}
					sql += COLUMN+" "+DATABASE[TABLE][COLUMN];
					i++;
				}
				sql += ")";
				connection.query(sql, function (error, result){
					if (error) throw error;
					console.log("Table created");
					if((e++)!=(TABLE_COUNT.length-1)){
						TABLE_CREATION(e++);
					}
				});
			} else {
				if((e++)!=(TABLE_COUNT.length-1)){
					TABLE_CREATION(e++);
				}
			}
		});
	}

//EXPRESS ====================
	app.set('view engine','ejs');
	app.use(express.static('public'));

	//FUNÇÕES PARA POST
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());

		app.get('/', function(req, res){
			var users = ['Gustavo', 'Marcelo', 'Thiago'];
			res.render('login',{users: users});
		});

//REDIRECIONAMENTO DA ROTA DO EXPRESS ====================
	http.listen(3000, function(){  
		console.log('servidor rodando em localhost:3000');
	});