/*! Main v1.00.0 | (c) 2014, 2014 | */

/* ========== User Control ========== */

/************ NAVIGATION **************/
 
//Assim que a janela identificar que houve uma tecla pressionada inicia a função pressionaTecla();
window.onkeydown = pressionaTecla;

var walking = false;

/**========== TECLA PRESSIONADA ==========**/
/** A função pressionaTecla verifica se a travaTeclado está ativa para evitar excesso de contagem de slides e transição sobre transição que pode ocasionar bugs, depois verifica qual a tecla pressionada para tratar a transição de slides, caso esteja disponível.**/
//Função pressionaTecla(); referente ao argumento 'e'
function pressionaTecla(e) {
	if(walking==false){
		//Se o a tecla pressionada da variável 'e' for refere ao número 39 -right- (http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes)
		if (e.keyCode==39) {
			user_motion('right', user_name);
		} 
		//Se o a tecla pressionada da variável 'e' for refere ao número 37 -left- (http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes)
		else if (e.keyCode==37) {
			user_motion('left', user_name);
		}
		//Se o a tecla pressionada da variável 'e' for refere ao número 38 -up- (http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes)
		else if (e.keyCode==38) {
			user_motion('up', user_name);
		}
		//Se o a tecla pressionada da variável 'e' for refere ao número 40 -down- (http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes)
		else if (e.keyCode==40) {
			user_motion('down', user_name);
		}
	}
}

function user_motion(vetor, thisName) {
	var motion;
	var axis;
	var current_x = $('.'+thisName).data('x');
	var current_y = $('.'+thisName).data('y');
	var next_x = current_x;
	var next_y = current_y;
	if (vetor=='right') {
		axis = 'x';
		motion = 1;
		next_x = $('.'+thisName).data('x')+motion;
	} else if (vetor=='left') {
		axis = 'x';
		motion = -1;
		next_x = $('.'+thisName).data('x')+motion;
	} else if (vetor=='up') {
		axis = 'y';
		motion = -1;
		next_y = $('.'+thisName).data('y')+motion;
	} else if (vetor=='down') {
		axis = 'y';
		motion = 1;
		next_y = $('.'+thisName).data('y')+motion;
	}
	var next_placement = grid_column[next_x].grid_line[next_y];
	if (next_placement.state=='null'){
		walking=true;
		$('.'+thisName).data('x',next_x);
		$('.'+thisName).data('y',next_y);
		move(next_x, next_y, motion, axis, vetor, thisName);
		work_grid(current_x, current_y, 'null');
		work_grid(next_x, next_y, thisName);
	} else {
		user_vetor(vetor, thisName);
	}
}

/************ WALK **************/

//Socketio chega aqui
function move(new_x, new_y, vetor, direction, position, thisName) {
	user_vetor(position, thisName);
	var velocity = 200;
	if (user_name==thisName) {
		connecta(new_x, new_y, thisName, position);
		if(direction=='y'){
			grid_top_add = grid_top_add+(vetor*(square));
			var this_top = grid_top+(-1*(grid_top_add));
			$('#grid').animate({
				top: this_top
			}, velocity, function() {
				// Animation complete.
			});
		} else if (direction=='x'){
			grid_left_add = grid_left_add+(vetor*(square));
			var this_left = grid_left+(-1*(grid_left_add));
			$('#grid').animate({
				left: this_left
			}, velocity, function() {
				// Animation complete.
			});
		}
		user_x = new_x;
		user_y = new_y;
	}
	$('.'+thisName).animate({
		left: grid_column[new_x].position_x,
		top: grid_column[new_x].grid_line[new_y].position_y
	}, velocity, function() {
		// Animation complete.
		walking=false;
	});
}

/************ WALK ANIMATION **************/

/**========== SCROLL SETAS FIREFOX ==========**/	
/**Script para desativar scroll com setas no firefox (buga a navegação em baixa resolução se não tiver esse script)**/
//<![CDATA[
window.onload = function() {
	var temp = document.createElement('p');
	/*for(var i = 0; i < 100; i++) {
		document.body.appendChild( temp.cloneNode(true)  );
	}*/
	addEvent(document.body, 'keydown', keyDown);
	addEvent(window, 'keydown', keyDown);
}	
function addEvent(obj, evType, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(evType, fn, false);
		return true;
	}
	else if(obj.attachEvent) {
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	}
}	
function keyDown(e){
	var ev = e||event;
	var key = ev.which||ev.keyCode;
	var esc = 0;
	switch(key) {
		case 37: // left
		case 38: // up
		case 39: // right
		case 40: // down
		esc = 1;
	  	break;
	}
	if(esc && ev.preventDefault) {
		ev.preventDefault();
	}
	return esc;
}
// ]]>
//Fim do Script// JavaScript Document