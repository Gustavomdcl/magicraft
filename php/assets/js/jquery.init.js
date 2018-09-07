/*! Main v1.00.0 | (c) 2014, 2014 | */

/* ========== Set Up Variables ========== */

var column = 5;
var line = 5;
var square = 50;
var grid_column = new Array();

/* ========== Structure The Grid ========== */

var grid_width = column*square;
var grid_height = line*square;

$('#grid').css('width',grid_width);
$('#grid').css('height',grid_height);

/* ========== Calculate The Grid ========== */

for (var i = 0; i < column; i++) {//column
	grid_column.push({
		"position_x": i*square,
		"grid_line": new Array()
	});
	for (var j = 0; j < line; j++) {//line
		grid_column[i].grid_line.push({ 
			"state": 'null',
			"position_y": j*square
		});
		//function to visualy create the grid
		grid_lines(grid_column[i].position_x, grid_column[i].grid_line[j].position_y);
	}
}

function grid_lines(place_x, place_y) {
	$('#grid').append('<div class="square local-'+place_x+'-'+place_y+'"></div>');
	$('.local-'+place_x+'-'+place_y).css('width',square-1).css('height',square-1).css('left',place_x).css('top',place_y);
}

/* ========== Device Length ========== */

var device_width;
var device_height;

/** Função para centralizar o grid em qualquer dimensão **/
//Função sizeScreen();
function sizeScreen() {
	//Cria a variável w e h com o valor do tamanho do comprimento e altura, respectivamente, da tela
	device_width = $(document).width();
	device_height = $(document).height();
	gridPlacement();
}
//A janela carrega a função
$(window).load(function() {
	//Carrega a função sizeScreen();
	sizeScreen();
});
//Se a janela for redimensionada, chama a função
$(window).resize(function() {
	//Carrega a função sizeScreen();
	sizeScreen();
});

/* ========== Place The Grid ========== */

var grid_top;
var grid_left;
var grid_top_add = 0;
var grid_left_add = 0;

function gridPlacement() {
	grid_top = (device_height-grid_height)/2;
	grid_left = (device_width-grid_width)/2;
	var grid_top_final = grid_top+(-1*(grid_top_add));
	var grid_left_final = grid_left+(-1*(grid_left_add));
	$('#grid').css('top', grid_top_final);
	$('#grid').css('left', grid_left_final);
}

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

function environment_place(place_x, place_y) {
	var environment_x = grid_column[place_x].position_x;
	var environment_y = grid_column[place_x].grid_line[place_y].position_y;
	$('#grid').append('<div class="environment environment-'+place_x+'-'+place_y+'">obstacle</div>');
	$('.environment-'+place_x+'-'+place_y).css('width',square-1).css('height',square-1).css('left',environment_x).css('top',environment_y);
}

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
	$('.environment_figure-'+val.position_x+'-'+val.position_y).css('width',square*val.width).css('height',square*val.height).css('left',environment_x).css('top',environment_y).css('background-image','url(assets/img/enviromnent_figure/'+val.background+')');
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

function player_place(place_x, place_y) {
	var player_x = grid_column[place_x].position_x;
	var player_y = grid_column[place_x].grid_line[place_y].position_y;
	$('#grid').append('<div class="player player-'+place_x+'-'+place_y+'">player-'+place_x+'-'+place_y+'</div>');
	$('.player-'+place_x+'-'+place_y).css('width',square-1).css('height',square-1).css('left',player_x).css('top',player_y);
}

/* ========== Place User ========== */

var user_placed = false;
var user_x, user_y;
var grid_middle_x = parseInt(column/2);
var grid_middle_y = parseInt(line/2);
//Código antigo de colocar o user no inicio de tudo
/*$.each(grid_column, function(number_c, value_c){
	if(user_placed == true){ return false; }
	$.each(value_c.grid_line, function(number_l, value_l){
		if(value_l.state=='null'){
			user_placement(value_c.position_x, value_l.position_y, number_c, number_l);
			user_placed = true;
			return false;
		}
	});
});*/
//Código novo de colocar no meio da tela
var loading_top;
var loading_left;
for(var a = grid_middle_x; a < column; a++){//column
	loading_left = (a-grid_middle_x)*square;
	loading_top=0;
	for (var b = grid_middle_y; b < line; b++) {//line
		loading_top = (b-grid_middle_y)*square;
		if(grid_column[a].grid_line[b].state=='null'){
			user_placement(grid_column[a].position_x, grid_column[a].grid_line[b].position_y, a, b);
			user_placed = true;
			grid_top_add = 1*(loading_top);
			break;
		}
	}
	grid_left_add = 1*(loading_left);
	if(user_placed == true){ break; }
}

function user_placement(place_x, place_y, number_x, number_y) {
	$('#grid').append('<div class="user">you</div>');
	$('.user').css('width',square-1).css('height',square-1).css('left',place_x).css('top',place_y).css('background-image','url(assets/img/down.gif)');
	user_x = number_x;
	user_y = number_y;
}

