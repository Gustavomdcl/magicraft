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
	var FILL = {
		MC_USER: {
			fill		: false
		},
		MC_USER_STYLE: {
			fill		: false
		},
		MC_STYLES: {
			fill		: true,
			fields		: "(category, name, slug, price)",
			values		: [
				//Skin
					['skin','Osso','bone',0],
					['skin','Sangue','blood',0],
					['skin','Areia','sand',0],
					['skin','Amêndoa','almond',0],
					['skin','Chocolate','chocolate',0],
					['skin','Café','coffee',0],
				//Hair
					['hair','Cabelo Chanel Preto','chanel_black',0],
					['hair','Cabelo Longo Marrom','long_brown',0],
				//Face
					['face','Óculos Quadrado','squared_glasses',0],
				//Beard 
					['beard','Barba Curta','thin',0],
				//Upper Body
					['upperBody','Capa Sonserina','cloak_s',0],
					['upperBody','Cabelo Capa Grifinória','cloak_g',0],
				//Hand Right
					['rightHand','Varinha Simples','wand_right',0]
			]
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
					if(FILL[TABLE]['fill']==true){
						var FillMYSQL = "INSERT INTO "+TABLE+" "+FILL[TABLE]['fields']+" VALUES ?";
						connection.query(FillMYSQL, [FILL[TABLE]['values']], function (err, result) {
							if (err) throw err;
							console.log("Number of records inserted: " + result.affectedRows);
						});
					}
					if((e++)!=(TABLE_COUNT.length-1)){
						TABLE_CREATION(e++);
					} else {
						GET_BASIC();
					}
				});
			} else {
				if((e++)!=(TABLE_COUNT.length-1)){
					TABLE_CREATION(e++);
				} else {
					GET_BASIC();
				}
			}
		});
	}

	var basic = {};
	function GET_BASIC(){
		basic['skins'] = [];
		basic['hairs'] = [];
		basic['faces'] = [];
		basic['beards'] = [];
		basic['upperBodys'] = [];
		basic['rightHands'] = [];
		/*basic['skin_selection'] = "SELECT `slug`, `name` FROM `MC_STYLES` WHERE `category` = 'skin'";
		connection.query(basic['skin_selection'], function (error, results, fields) {
			if (error) {
				throw error;
			} else {
				if(results!=''){
					for (var i = 0; i < results.length; i++) {
						basic['skins'].push({name:results[i].name,slug:results[i].slug});
					}
				} else {}
			}
		});*/
		for (var i = 0; i < FILL['MC_STYLES']['values'].length; i++) {
			basic[FILL['MC_STYLES']['values'][i][0]+'s'].push({name:FILL['MC_STYLES']['values'][i][1],slug:FILL['MC_STYLES']['values'][i][2]});
		}
	}

//EXPRESS ====================
	app.set('view engine','ejs');
	app.use(express.static('public'));

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	//FUNÇÃO PRINCIPAL
		app.get('/', function(req, res){
			res.render('login',{
				skins:basic['skins'],
				hairs:basic['hairs'],
				faces:basic['faces'],
				beards:basic['beards'],
				upperBodys:basic['upperBodys'],
				rightHands:basic['rightHands'],

				logemail:req.query['logemail'],

				email:req.query['email'],
				user:req.query['user']
			});
		});

	//FUNÇÕES DE PLAY
		app.post('/play/', function(req, res){
			app.use('/play', express.static('public'));
			var logdata = req.body;
			var user_verify = "SELECT MC_USER.id, MC_USER.user, MC_USER.verify, MC_USER_STYLE.skin, MC_USER_STYLE.head, MC_USER_STYLE.hair, MC_USER_STYLE.face, MC_USER_STYLE.beard, MC_USER_STYLE.neck, MC_USER_STYLE.upperBody, MC_USER_STYLE.torso, MC_USER_STYLE.leftHand, MC_USER_STYLE.rightHand, MC_USER_STYLE.legs, MC_USER_STYLE.feet FROM MC_USER JOIN MC_USER_STYLE ON MC_USER.id = MC_USER_STYLE.user WHERE MC_USER.email = '"+logdata['email']+"' AND MC_USER.password = '"+md5(logdata['password'])+"' LIMIT 1";
			connection.query(user_verify, function (error, results, fields) {
				if (error) {
					throw error;
				} else {
					if(results!=''){
						if(results[0]['verify']!='true'){
							res.render('logfail',{
								error:'validate false',
								email:logdata['email']
							});
						} else {
							//JOGOOOO AND MAGIC!!!! WOW.
						}
					} else {
						res.render('logfail',{
							error:'email password fail',
							email:logdata['email']
						});
					}
				}
			});
		});
		
		app.get('/disconnect', function(req, res, next){  
			res.sendFile(__dirname + '/disconnect.html');
		});

	//FUNÇÕES PARA VALIDATE
		app.get('/validation/', function(req, res){
			app.use('/validation', express.static('public'));
			if(req.query['send_email']==undefined){
				if(req.query['validate_email']==undefined||req.query['validate_verify']==undefined){
					res.render('404');
				} else {
					var user_verify = "SELECT MC_USER.id FROM MC_USER WHERE MC_USER.email = '"+req.query['validate_email']+"' AND MC_USER.verify = '"+req.query['validate_verify']+"' LIMIT 1";
					connection.query(user_verify, function (error, results, fields) {
						if (error) {
							throw error;
						} else {
							if(results!=''){
								//ENVIAR EMAIL!!
								var sql = "UPDATE MC_USER SET MC_USER.verify = 'true' WHERE MC_USER.id = '"+results[0]['id']+"'";
								connection.query(sql, function (err, result) {
									if (err) throw err;
									console.log(result.affectedRows + " record(s) updated");
									res.render('validation',{
										process:true,
										send_email:req.query['validate_email']
									});
								});
							} else {
								res.render('404');
							}
						}
					});
				}
			} else {
				//ENVIAR EMAIL!!
				res.render('validation',{
					process:'send_mail',
					send_email:req.query['send_email']
				});
			}
		});

	//FUNÇÕES PARA CADASTRO
		app.post('/register/', function(req, res){
			app.use('/register', express.static('public'));
			var registration = req.body;
			var emailExists = "SELECT count(*) FROM MC_USER WHERE email = '"+registration['email']+"'";
            connection.query(emailExists, function (error, results, fields) {
				if (error) {
					throw error;
				} else {
					if(results[0]['count(*)']==0){
						//https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
						var insert = "INSERT INTO MC_USER (user, email, password, verify) VALUES ('"+registration['user']+"', '"+registration['email']+"', '"+md5(registration['password'])+"', '"+md5(registration['password'])+"')";
						connection.query(insert, function (err, result) {
							if (err) throw err;
							var insertStyle = "INSERT INTO MC_USER_STYLE (user, skin, head, hair, face, beard, neck, upperBody, torso, leftHand, rightHand, legs, feet) VALUES ('"+result.insertId+"', '"+registration['skin']+"', '"+registration['head']+"', '"+registration['hair']+"', '"+registration['face']+"', '"+registration['beard']+"', '"+registration['neck']+"', '"+registration['upperBody']+"', '"+registration['torso']+"', '"+registration['leftHand']+"', '"+registration['rightHand']+"', '"+registration['legs']+"', '"+registration['feet']+"')";
							connection.query(insertStyle, function (err, resultStyle) {
								if (err) throw err;
								console.log("1 record inserted");
								console.log(result.insertId);
							});
						});
						//ENVIAR EMAIL!!
						res.render('register',{
							sucess:true,
							email:registration['email'],
							user:registration['user']
						});
					} else {
						res.render('register',{
							sucess:'email exists',
							email:registration['email'],
							user:registration['user']
						});
					}
				}
            });
		});

	//FUNÇÕES 404
		app.get('/register/', function(req, res){
			app.use('/register', express.static('public'));
			res.render('404');
		});

		app.get('/play/', function(req, res){
			app.use('/play', express.static('public'));
			res.render('404');
		});

//REDIRECIONAMENTO DA ROTA DO EXPRESS ====================
	http.listen(3000, function(){  
		console.log('servidor rodando em localhost:3000');
	});