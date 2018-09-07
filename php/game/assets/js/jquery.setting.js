/*! Main v1.00.0 | (c) 2014, 2014 | */
placeElements();
function placeElements(){

	/* ========== Place Environment ========== */

	//TRABALHAR AQUI*** (JUNTAR COM A FUNÇÃO ABAIXO)
	var environment_elements = [
	    //tree
		{
			'position_x':0,
			'position_y':0
		},
		{
			'position_x':0,
			'position_y':1
		},
		{
			'position_x':1,
			'position_y':0
		},
		{
			'position_x':1,
			'position_y':1
		},
		//rock
		{
			'position_x':3,
			'position_y':4
		}
	];

	$.each(environment_elements, function(number, val){
		grid_column[val.position_x].grid_line[val.position_y].state = 'environment';
		//function to visualy create the environment
		environment_place(val.position_x, val.position_y);
	});

	/* ========== Place Environment Figures ========== */

	//TRABALHAR AQUI*** (JUNTAR COM A FUNÇÃO ACIMA)
	var environment_figures = [
	    //tree
		{
			'position_x':0,
			'position_y':0,
			'width':2,
			'height':2,
			'background':'tree.gif'
		},
		//rock
		{
			'position_x':3,
			'position_y':4,
			'width':1,
			'height':1,
			'background':'rock.gif'
		}
	];

	$.each(environment_figures, function(number, val){
		var environment_x = grid_column[val.position_x].position_x;
		var environment_y = grid_column[val.position_x].grid_line[val.position_y].position_y;
		$('#grid').append('<div class="environment_figure environment_figure-'+val.position_x+'-'+val.position_y+'">figure</div>');
		$('.environment_figure-'+val.position_x+'-'+val.position_y).css('width',square*val.width).css('height',square*val.height).css('left',environment_x).css('top',environment_y).css('background-image','url(http://magicraft.life/game/assets/img/enviromnent_figure/'+val.background+')');
	});

	/* ========== Place Players ========== */

	var player_elements = new Array();

	var player_elements = [
	    //player
		{
			'position_x':0,
			'position_y':2
		},
		{
			'position_x':3,
			'position_y':3
		},
		{
			'position_x':4,
			'position_y':0
		}
	];

	$.each(player_elements, function(number, val){
		grid_column[val.position_x].grid_line[val.position_y].state = 'player';
		//function to visualy create the player
		player_place(val.position_x, val.position_y);
	});

}

function environment_place(place_x, place_y) {
	var environment_x = grid_column[place_x].position_x;
	var environment_y = grid_column[place_x].grid_line[place_y].position_y;
	$('#grid').append('<div class="environment environment-'+place_x+'-'+place_y+'">obstacle</div>');
	$('.environment-'+place_x+'-'+place_y).css('width',square-1).css('height',square-1).css('left',environment_x).css('top',environment_y);
}

function player_place(place_x, place_y, playerName) {
	var player_x = grid_column[place_x].position_x;
	var player_y = grid_column[place_x].grid_line[place_y].position_y;
	$('#grid').append('<div class="player '+playerName+'" style="width:'+(square-1)+'px;height:'+(square-1)+'px;left:'+player_x+'px;top:'+player_y+'px;">player-'+place_x+'-'+place_y+'</div>');
}