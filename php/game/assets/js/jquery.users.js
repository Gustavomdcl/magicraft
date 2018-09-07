/*! Main v1.00.0 | (c) 2014, 2014 | */

/* ========== Place This User ========== */
var user_placed = false;
//var user_name = '';
//var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
var user_x, user_y;
var grid_middle_x = parseInt(column/2);
var grid_middle_y = parseInt(line/2);
//Código novo de colocar no meio da tela
var loading_top;
var loading_left;
function place_this_user(){
	//for( var i=0; i < 3; i++ ) {
	//	user_name += possible.charAt(Math.floor(Math.random() * possible.length));
	//}
	for(var a = grid_middle_x; a < column; a++){//column
		loading_left = (a-grid_middle_x)*square;
		loading_top=0;
		for (var b = grid_middle_y; b < line; b++) {//line
			loading_top = (b-grid_middle_y)*square;
			if(grid_column[a].grid_line[b].state=='null'){
				user_placement(a, b, user_name, 'down');
				connecta(a, b, user_name, 'down');
				user_x = a;
				user_y = b;
				user_placed = true;
				grid_top_add = 1*(loading_top);
				break;
			}
		}
		grid_left_add = 1*(loading_left);
		if(user_placed == true){ break; }
	}
}

function user_placement(position_x, position_y, this_name, vetor) {
	var thisPositions = work_grid(position_x, position_y, this_name);
	$('#grid').append('<div class="user '+this_name+'" data-x="'+position_x+'" data-y="'+position_y+'" style="width:'+(square-1)+'px;height:'+(square-1)+'px;left:'+thisPositions.position_x+'px;top:'+thisPositions.position_y+'px;"><span>'+this_name+'</span></div>');
	user_vetor(vetor, this_name)
}

function user_vetor(destination, thisName) {
	if(destination=='right'){
		$('.'+thisName).css('background-image','url(http://magicraft.life/game/assets/img/right.gif)');
	} else if(destination=='left'){
		$('.'+thisName).css('background-image','url(http://magicraft.life/game/assets/img/left.gif)');
	} else if(destination=='up'){
		$('.'+thisName).css('background-image','url(http://magicraft.life/game/assets/img/up.gif)');
	} else if(destination=='down'){
		$('.'+thisName).css('background-image','url(http://magicraft.life/game/assets/img/down.gif)');
	}
}