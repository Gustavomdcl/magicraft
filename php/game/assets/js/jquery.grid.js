/*! Main v1.00.0 | (c) 2014, 2014 | */

/* ========== Set Up Variables ========== */

var column = 5;
var line = 5;
var square = 50;
var grid_column = new Array();

/* ========== Structure The Grid ========== */

var grid_width = column*square;
var grid_height = line*square;
create_grid();
function create_grid() {

	$('#grid').css('width',grid_width);
	$('#grid').css('height',grid_height);

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
			gridLines(grid_column[i].position_x, grid_column[i].grid_line[j].position_y);
		}
	}
}

function gridLines(place_x, place_y) {
	$('#grid').append('<div class="square local-'+place_x+'-'+place_y+'"></div>');
	$('.local-'+place_x+'-'+place_y).css('width',square-1).css('height',square-1).css('left',place_x).css('top',place_y);
}

/* ========== Work The Grid ========== */

function work_grid(place_x, place_y, thisState) {
	if(thisState==undefined){
		return {
			'position_x':grid_column[place_x].position_x,
			'position_y':grid_column[place_x].grid_line[place_y].position_y
		};
	} else {
		grid_column[place_x].grid_line[place_y].state = thisState;
		return {
			'position_x':grid_column[place_x].position_x,
			'position_y':grid_column[place_x].grid_line[place_y].position_y
		};
	}
}

//alert(work_grid(1, 2).position_x);

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