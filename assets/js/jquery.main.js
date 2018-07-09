/*! Main v1.00.0 | (c) 2014, 2014 | */

var block = 84;
var timing = 100;
var grid = {
	element: $('#grid'),
	structure: new Array()
};
var column = Number(grid.element.attr('column'));
var row = Number(grid.element.attr('row'));

/* ==== GRID ==== */
	Setup_Grid();
	function Setup_Grid(){
		grid['width'] = column*block;
		grid['height'] = row*block;
		grid.element.width(column*block).height(row*block);
		var i;
		for (i = 1; i <= column; i++) { 
			grid.structure[i] = new Array();
			var j;
			for (j = 1; j <= row; j++) { 
				grid.structure[i][j] = {
					occupied: false
				};
			}
		}
	}
	function Action_ArrangeGrid(column_this,row_this){
		var left = (column_this-1)*block;
		grid['element'].css({
			'left': '-'+left+'px'
		});
		var top = (row_this-1)*block;
		grid['element'].css({
			'top': '-'+top+'px'
		});
	}

/* ==== ELEMENT ==== */
	Setup_Elements();
	function Setup_Elements(e){
		var element = $('.element');
		element.each(function(){
			var column_element = Number($(this).attr('column'));
			var row_element = Number($(this).attr('row'));
			if($(this).attr('occupied')!='false'){
				grid.structure[column_element][row_element].occupied = true;
			}
			$(this).css({
				"top": ((row_element-1)*block)+"px",
				"left": ((column_element-1)*block)+"px"
			});
			var width_element = block*Number($(this).attr('width'));
			if($(this).attr('width')!=''){
				$(this).css('width',width_element+'px');
				if($(this).attr('occupied')!='false'){
					var i;
					for (i = 1; i <= Number($(this).attr('width'))-1; i++) {
						grid.structure[column_element+i][row_element].occupied = true;
					}
				}
			}
			var height_element = block*Number($(this).attr('height'));
			if($(this).attr('height')!=''){
				$(this).css('height',height_element+'px');
				if($(this).attr('occupied')!='false'){
					var i;
					for (i = 1; i <= Number($(this).attr('height'))-1; i++) {
						grid.structure[column_element][row_element+i].occupied = true;
					}
				}
			}
			if($(this).attr('height')!=''&&$(this).attr('width')!=''){
				var i;
				for (i = 1; i <= Number($(this).attr('height'))-1; i++) {
					var j;
					for (j = 1; j <= Number($(this).attr('width'))-1; j++) {
						grid.structure[column_element+j][row_element+i].occupied = true;
					}
				}
			}
		});
	}

/* ==== LOAD CHARACTER ==== */
	Load_Character('#initial','odd_gus');
	var placement;
	function Load_Character(door,user){
		var column_door = Number($(door).attr('column'));
		var row_door = Number($(door).attr('row'));
		placement = 0;
		Action_ArrangeCharacter('me',column_door,row_door,1);
	}
	function Action_ArrangeCharacter(who,column_this,row_this,position){
		if(Action_OccupiedCheck(column_this,row_this,'simple')&&Action_OccupiedCheck(column_this,row_this,'exists')){
			if(Action_OccupiedCheck(column_this,row_this,'occupied')){
				Action_PlaceCharacter(who,column_this,row_this);
			} else {
				Action_ArrangeCharacterChecking(who,column_this,row_this,position);
			}
		} else {
			Action_ArrangeCharacterChecking(who,column_this,row_this,position);
		}
	}
	function Action_ArrangeCharacterChecking(who,column_this,row_this,position){
		if(position==1){
			placement++;
			for (var i = 1; i <= placement; i++) {
				row_this++;
				if(Action_OccupiedCheck(column_this,row_this,'simple')&&Action_OccupiedCheck(column_this,row_this,'exists')){
					if(Action_OccupiedCheck(column_this,row_this,'occupied')){
						Action_PlaceCharacter(who,column_this,row_this);
						break;
					} else if(i==placement){
						Action_ArrangeCharacter(who,column_this,row_this,2);
						break;
					} 
				} else if (i==placement){
					Action_ArrangeCharacter(who,column_this,row_this,2);
					break;
				}
			}
		} else if(position==2){
			for (var i = 1; i <= placement; i++) {
				column_this--;
				if(Action_OccupiedCheck(column_this,row_this,'simple')&&Action_OccupiedCheck(column_this,row_this,'exists')){
					if(Action_OccupiedCheck(column_this,row_this,'occupied')){
						Action_PlaceCharacter(who,column_this,row_this);
						break;
					} else if(i==placement){
						Action_ArrangeCharacter(who,column_this,row_this,3);
						break;
					} 
				} else if (i==placement){
					Action_ArrangeCharacter(who,column_this,row_this,3);
					break;
				}
			}
		} else if(position==3){
			placement++;
			for (var i = 1; i <= placement; i++) {
				row_this--;
				if(Action_OccupiedCheck(column_this,row_this,'simple')&&Action_OccupiedCheck(column_this,row_this,'exists')){
					if(Action_OccupiedCheck(column_this,row_this,'occupied')){
						Action_PlaceCharacter(who,column_this,row_this);
						break;
					} else if(i==placement){
						Action_ArrangeCharacter(who,column_this,row_this,4);
						break;
					} 
				} else if (i==placement){
					Action_ArrangeCharacter(who,column_this,row_this,4);
					break;
				}
			}
		} else if(position==4){
			for (var i = 1; i <= placement; i++) {
				column_this++;
				if(Action_OccupiedCheck(column_this,row_this,'simple')&&Action_OccupiedCheck(column_this,row_this,'exists')){
					if(Action_OccupiedCheck(column_this,row_this,'occupied')){
						Action_PlaceCharacter(who,column_this,row_this);
						break;
					} else if(i==placement){
						Action_ArrangeCharacter(who,column_this,row_this,1);
						break;
					} 
				} else if (i==placement){
					Action_ArrangeCharacter(who,column_this,row_this,1);
					break;
				}
			}
		}
	}
	function Action_PlaceCharacter(who,column_this,row_this){
		Action_ArrangeGrid(column_this,row_this);
		Action_PlaceAllCharacters(who,column_this,row_this);
	}
	function Action_PlaceAllCharacters(who,column_this,row_this){
		grid.structure[column_this][row_this].occupied = true;
		grid.element.append('<div id="'+who+'" class="character position-1-2" column="'+column_this+'" row="'+row_this+'" style="left:'+((column_this-1)*block)+'px;top:'+((row_this-1)*block)+'px;"></div>');
	}

/* ==== NAVIGATION ==== */
	window.onkeydown = Action_KeyPressed;
	function Action_KeyPressed(e) {
		if (e.keyCode==39) {
			Action_CharacterMovement('#me','right','+',3);
		} else if (e.keyCode==40) {
			Action_CharacterMovement('#me','down','+',1);
		} else if (e.keyCode==37) {
			Action_CharacterMovement('#me','left','-',2);
		} else if (e.keyCode==38) {
			Action_CharacterMovement('#me','up','-',4);
		} else if (e.keyCode==83) {
			Action_Sit('#me');
		}
	}

/* ==== CHARACTER MOVEMENT ==== */
	var Character_MovementLock = false;
	function Action_CharacterMovement(who,position,polarity,direction){
		Action_AnimateCharacterMovement(who,position,direction);
		var column_element = $(who).attr('column');
		var row_element = $(who).attr('row');
		var column_next;
		var row_next;
		if(position=='right'){
			column_next = Number(column_element)+1;
			row_next = row_element;
		} else if(position=='left'){
			column_next = Number(column_element)-1;
			row_next = row_element;
		} else if(position=='up'){
			column_next = column_element;
			row_next = Number(row_element)-1;
		} else if(position=='down'){
			column_next = column_element;
			row_next = Number(row_element)+1;
		}
		if(Action_OccupiedCheck(column_next,row_next,'complete')){
			if(Character_MovementLock==false){
				if(polarity=='+'){
					polarity_grid='-';
				} else if(polarity=='-'){
					polarity_grid='+';
				}
				grid.structure[column_element][row_element].occupied = false;
				grid.structure[column_next][row_next].occupied = true;
				Character_MovementLock = true;
				if (position=='right'||position=='left'){
					$(who).animate({
						left: polarity+"="+block
					},timing*3, function() {
						Character_MovementLock = false;
					});
					grid.element.animate({
						left: polarity_grid+"="+block
					},timing*3, function() {});
					if(position=='right'){
						$(who).attr('column',Number(column_element)+1);
					} else if(position=='left'){
						$(who).attr('column',Number(column_element)-1);
					}
				} else if (position=='up'||position=='down'){
					$(who).animate({
						top: polarity+"="+block
					},timing*3, function() {
						Character_MovementLock = false;
					});
					grid.element.animate({
						top: polarity_grid+"="+block
					},timing*3, function() {});
					if(position=='up'){
						$(who).attr('row',Number(row_element)-1);
					} else if(position=='down'){
						$(who).attr('row',Number(row_element)+1);
					}
				}
			}
		}
	}
	function Action_OccupiedCheck(column_this,row_this,type){
		var value;
		if(type=='simple'){
			value = row_this != 0 &&
			column_this != 0 &&
			row_this <= row &&
			column_this <= column;
		} else if(type=='exists'){
			value = grid.structure[column_this]!=null&&
			grid.structure[column_this][row_this]!=null;
		} else if(type=='occupied'){
			value = grid.structure[column_this][row_this].occupied == false;
		} else {
			value = grid.structure[column_this][row_this].occupied == false &&
			row_this != 0 &&
			column_this != 0 &&
			row_this <= row &&
			column_this <= column;
		}
		return value;
	}

/* ==== ANIMATE CHARACTER MOVEMENT ==== */
	var Character_AnimateMovementLock = false;
	function Action_AnimateCharacterMovement(who,position,direction) {
		if(Character_AnimateMovementLock==false){
			Character_AnimateMovementLock = true;
			Action_ClearPosition(who);
			$(who).removeClass('sit').addClass('position-'+direction+'-'+1);
			setTimeout(function(){
				Action_ClearPosition(who);
				$(who).addClass('position-'+direction+'-'+2);
				setTimeout(function(){
					Action_ClearPosition(who);
					$(who).addClass('position-'+direction+'-'+3);
					setTimeout(function(){
						Action_ClearPosition(who);
						$(who).addClass('position-'+direction+'-'+2);
						Character_AnimateMovementLock = false;
					},timing);
				},timing);
			},timing);
		}
	}
	function Action_ClearPosition(who){
		var classList = $(who).attr('class').split(/\s+/);
		$.each(classList, function(index, classItem) {
			if (classItem.includes('position')) {
				$(who).removeClass(classItem);
			}
		});
	}
	function Action_Sit(who){
		if(Character_AnimateMovementLock==false||Character_MovementLock==false){
			if($(who).hasClass('sit')){
				$(who).removeClass('sit');
			} else {
				$(who).addClass('sit');
			}
		}
	}
