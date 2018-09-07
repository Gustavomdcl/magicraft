/*! Main v1.00.0 | (c) 2014, 2014 | */

/* ========== Require Players ========== */

/* ===== SOCKET IO ===== */

//Login
$('body').prepend('<div class="login" > <form id="login_form"> <h1>Login</h1> <input type="text" name="email" id="email" placeholder="Email" required> <input type="password" name="senha" id="senha" placeholder="Senha" required> <button type="submit" class="fazer-login">Fazer Login</button> <a href="http://magicraft.life/">Criar Conta | Mudar Senha</a> </form> </div><!-- .login-->');

$('.fazer-login').click(function(e){
	e.preventDefault();
	var loginData = $('form#login_form #email').val()+'/'+$('form#login_form #senha').val();
	socket.emit('socket login', loginData);
});

//Was = after 'for()' from index.js, in other words loading all users, place the user
//Is = after login
var user_name = '';
socket.on('start placement', function(user_data){
	$('.login').remove();
	user_name = user_data;
	place_this_user();
});

socket.on('failed login', function(user_data){
	$('.login-error').remove();
	$('form#login_form').append('<p class="login-error">'+user_data+'</p>');
});

//Send user data
function connecta(position_x, position_y, this_name, vetor) {
	var user_data = position_x+'/'+position_y+'/'+this_name+'/'+vetor;
	socket.emit('user change', user_data);
	socket.emit('data', user_data);
}

//First time getting on, load users
socket.on('first user', function(user_data){
	var thisUserX = user_data.split('/')[0];
	var thisUserY = user_data.split('/')[1];
	var thisUserName = user_data.split('/')[2];
	var thisUserVetor = user_data.split('/')[3];
	user_placement(thisUserX, thisUserY, thisUserName, thisUserVetor);
});

/* ========== Place Users ========== */

//When some user has changed
socket.on('user change', function(user_data){
	if(user_data.split('/')[2]!=user_name){
		var thisUserX = user_data.split('/')[0];
		var thisUserY = user_data.split('/')[1];
		var thisUserName = user_data.split('/')[2];
		var thisUserVetor = user_data.split('/')[3];
		if($('.'+thisUserName).length) {
			if($('.'+thisUserName).data('x')==thisUserX && $('.'+thisUserName).data('y')==thisUserY){
				user_vetor(thisUserVetor, thisUserName);
			} else {
				user_motion(thisUserVetor, thisUserName);
			}
		} else {
			user_placement(thisUserX, thisUserY, thisUserName, thisUserVetor);
		}
	}
});

//When some user has logged out
socket.on('logout user', function(user_data){
	if (user_data.split('/')[2]!=user_name) {
		var thisUserName = user_data.split('/')[2];
		work_grid($('.'+thisUserName).data('x'), $('.'+thisUserName).data('y'), 'null');
		$('.'+thisUserName).remove();
	}
});