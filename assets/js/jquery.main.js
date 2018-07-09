/*! Main v1.00.0 | (c) 2014, 2014 | */

var config = {};
	config['block'] = 84;
	config['timing'] = 100;
var grid = {};
	grid['who'] = '#grid';
	grid['element'] = $(grid['who']);
	grid['structure'] = new Array();
	grid['column'] = Number(grid['element'].attr('column'));
	grid['row'] = Number(grid['element'].attr('row'));
var me = {};
	me['name'] = 'odd_gus';
	me['who'] = '#'+me['name'];


/* ==== GRID ==== */
	Setup_Grid();
	function Setup_Grid(){
		grid['width'] = grid['column']*config['block'];
		grid['height'] = grid['row']*config['block'];
		grid['element'].width(grid['column']*config['block']).height(grid['row']*config['block']);
		var i;
		for (i = 1; i <= grid['column']; i++) { 
			grid['structure'][i] = new Array();
			var j;
			for (j = 1; j <= grid['row']; j++) { 
				grid['structure'][i][j] = {
					occupied: false
				};
			}
		}
	}
	function Action_ArrangeGrid(column_this,row_this){
		var left = (column_this-1)*config['block'];
		grid['element'].css({
			'left': '-'+left+'px'
		});
		var top = (row_this-1)*config['block'];
		grid['element'].css({
			'top': '-'+top+'px'
		});
	}

/* ==== ELEMENT ==== */
	Setup_Elements();
	function Setup_Elements(e){
		$('.element').each(function(){
			var element = {};
				element['element'] = $(this);
				element['column'] = Number(element['element'].attr('column'));
				element['row'] = Number(element['element'].attr('row'));
				element['occupied'] = element['element'].attr('occupied');
				element['width'] = Number(element['element'].attr('width'));
				element['height'] = Number(element['element'].attr('height'))
			if(element['occupied']!='false'){
				grid['structure'][element['column']][element['row']].occupied = true;
			}
			element['element'].css({
				"top": ((element['row']-1)*config['block'])+"px",
				"left": ((element['column']-1)*config['block'])+"px"
			});
			var width_element = config['block']*element['width'];
			if(element['element'].attr('width')!=''){
				element['element'].css('width',width_element+'px');
				if(element['occupied']!='false'){
					var i;
					for (i = 1; i <= element['width']-1; i++) {
						grid['structure'][element['column']+i][element['row']].occupied = true;
					}
				}
			}
			var height_element = config['block']*element['height'];
			if(element['element'].attr('height')!=''){
				element['element'].css('height',height_element+'px');
				if(element['occupied']!='false'){
					var i;
					for (i = 1; i <= element['height']-1; i++) {
						grid['structure'][element['column']][element['row']+i].occupied = true;
					}
				}
			}
			if(element['element'].attr('height')!=''&&element['element'].attr('width')!=''){
				var i;
				for (i = 1; i <= Number(element['element'].attr('height'))-1; i++) {
					var j;
					for (j = 1; j <= Number(element['element'].attr('width'))-1; j++) {
						grid['structure'][element['column']+j][element['row']+i].occupied = true;
					}
				}
			}
		});
	}

/* ==== LOAD CHARACTER ==== */
	Load_Character(me['name'],'#initial');
	config['placement'];
	function Load_Character(who,element){
		config['placement'] = 0;
		var door = {};
			door['element'] = element;
			door['column'] = Number($(door['element']).attr('column'));
			door['row'] = Number($(door['element']).attr('row'));
		Action_ArrangeCharacter(who,door['column'],door['row'],1);
	}
	function Action_ArrangeCharacter(who,column_this,row_this,position){
		var element = {};
			element['element'] = who;
			element['column'] = column_this;
			element['row'] = row_this;
		if(Action_OccupiedCheck(element['column'],element['row'],'simple')&&Action_OccupiedCheck(element['column'],element['row'],'exists')){
			if(Action_OccupiedCheck(element['column'],element['row'],'occupied')){
				Action_PlaceCharacter(element['element'],element['column'],element['row']);
			} else {
				Action_ArrangeCharacterChecking(element['element'],element['column'],element['row'],position);
			}
		} else {
			Action_ArrangeCharacterChecking(element['element'],element['column'],element['row'],position);
		}
	}
	function Action_ArrangeCharacterChecking(who,column_this,row_this,position){
		var element = {};
			element['element'] = who;
			element['column'] = column_this;
			element['row'] = row_this;
		var next,turn,polarity;
		if(position==1){
			next = 2;
			turn = 'row';
			polarity = '+';
			config['placement']++;
		} else if(position==2){
			next = 3;
			turn = 'column';
			polarity = '-';
		} else if(position==3){
			next = 4;
			turn = 'row';
			polarity = '-';
			config['placement']++;
		} else if(position==4){
			next = 1;
			turn = 'column';
			polarity = '+';
		}
		for (var i = 1; i <= config['placement']; i++) {
			if(polarity=='+'){
				element[turn]++;
			} else if(polarity=='-'){
				element[turn]--;
			}
			if(Action_OccupiedCheck(element['column'],element['row'],'simple')&&Action_OccupiedCheck(element['column'],element['row'],'exists')){
				if(Action_OccupiedCheck(element['column'],element['row'],'occupied')){
					Action_PlaceCharacter(element['element'],element['column'],element['row']);
					break;
				} else if(i==config['placement']){
					Action_ArrangeCharacter(element['element'],element['column'],element['row'],next);
					break;
				} 
			} else if (i==config['placement']){
				Action_ArrangeCharacter(element['element'],element['column'],element['row'],next);
				break;
			}
		}
	}
	function Action_PlaceCharacter(who,column_this,row_this){
		var element = {};
			element['element'] = who;
			element['column'] = column_this;
			element['row'] = row_this;
		Action_ArrangeGrid(element['column'],element['row']);
		Action_PlaceAllCharacters(element['element'],element['column'],element['row']);
	}
	function Action_PlaceAllCharacters(who,column_this,row_this){
		var element = {};
			element['element'] = who;
			element['column'] = column_this;
			element['row'] = row_this;
		grid['structure'][element['column']][element['row']].occupied = true;
		grid['element'].append('<div id="'+element['element']+'" class="character position-1-2" column="'+element['column']+'" row="'+element['row']+'" style="left:'+((element['column']-1)*config['block'])+'px;top:'+((element['row']-1)*config['block'])+'px;"></div>');
			Action_ClearPosition('#'+element['element']);
			Action_GetItems('#'+element['element']);
			Effect_Apparate('#'+element['element']);
	}

/* ==== ITEMS ==== */

	function Action_GetItems(who){

	}

/* ==== EFFECTS ==== */

	function Effect_Apparate(who){
		//Effect
			$(who).append('<div class="effect apparate inner"></div>');
		//Animate
			$(who).addClass('position-'+2+'-'+2).css('opacity',0.25);
			setTimeout(function(){
				Action_ClearPosition(who);
				$(who).addClass('position-'+4+'-'+2).css('opacity',0.50);
				setTimeout(function(){
					Action_ClearPosition(who);
					$(who).addClass('position-'+3+'-'+2).css('opacity',0.75);
					setTimeout(function(){
						Action_ClearPosition(who);
						$(who).addClass('position-'+1+'-'+2).css('opacity',1).find('.apparate').remove();
					},config['timing']);
				},config['timing']);
			},config['timing']);
	}

/* ==== NAVIGATION ==== */
	window.onkeydown = Action_KeyPressed;
	function Action_KeyPressed(e) {
		if (e.keyCode==39) {
			Action_CharacterMovement(me['who'],'right','+',3);
		} else if (e.keyCode==40) {
			Action_CharacterMovement(me['who'],'down','+',1);
		} else if (e.keyCode==37) {
			Action_CharacterMovement(me['who'],'left','-',2);
		} else if (e.keyCode==38) {
			Action_CharacterMovement(me['who'],'up','-',4);
		} else if (e.keyCode==83) {
			Action_Sit(me['who']);
		}
	}

/* ==== CHARACTER MOVEMENT ==== */
	var Character_MovementLock = false;
	function Action_CharacterMovement(who,position,polarity,direction){
		Action_AnimateCharacterMovement(who,position,direction);
		var element = {};
			element['element'] = $(who);
			element['column'] = element['element'].attr('column');
			element['row'] = element['element'].attr('row');
		var column_next;
		var row_next;
		if(position=='right'){
			column_next = Number(element['column'])+1;
			row_next = element['row'];
		} else if(position=='left'){
			column_next = Number(element['column'])-1;
			row_next = element['row'];
		} else if(position=='up'){
			column_next = element['column'];
			row_next = Number(element['row'])-1;
		} else if(position=='down'){
			column_next = element['column'];
			row_next = Number(element['row'])+1;
		}
		if(Action_OccupiedCheck(column_next,row_next,'simple')&&Action_OccupiedCheck(column_next,row_next,'exists')){
			if(Action_OccupiedCheck(column_next,row_next,'occupied')){
				if(Character_MovementLock==false){
					if(polarity=='+'){
						polarity_grid='-';
					} else if(polarity=='-'){
						polarity_grid='+';
					}
					grid['structure'][element['column']][element['row']].occupied = false;
					grid['structure'][column_next][row_next].occupied = true;
					Character_MovementLock = true;
					if (position=='right'||position=='left'){
						element['element'].animate({
							left: polarity+"="+config['block']
						},config['timing']*3, function() {
							Character_MovementLock = false;
						});
						grid['element'].animate({
							left: polarity_grid+"="+config['block']
						},config['timing']*3, function() {});
						if(position=='right'){
							element['element'].attr('column',Number(element['column'])+1);
						} else if(position=='left'){
							element['element'].attr('column',Number(element['column'])-1);
						}
					} else if (position=='up'||position=='down'){
						element['element'].animate({
							top: polarity+"="+config['block']
						},config['timing']*3, function() {
							Character_MovementLock = false;
						});
						grid['element'].animate({
							top: polarity_grid+"="+config['block']
						},config['timing']*3, function() {});
						if(position=='up'){
							element['element'].attr('row',Number(element['row'])-1);
						} else if(position=='down'){
							element['element'].attr('row',Number(element['row'])+1);
						}
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
			row_this <= grid['row'] &&
			column_this <= grid['column'];
		} else if(type=='exists'){
			value = grid['structure'][column_this]!=null&&
			grid['structure'][column_this][row_this]!=null;
		} else if(type=='occupied'){
			value = grid['structure'][column_this][row_this].occupied == false;
		} else {
			value = grid['structure'][column_this][row_this].occupied == false &&
			row_this != 0 &&
			column_this != 0 &&
			row_this <= grid['row'] &&
			column_this <= grid['column'];
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
					},config['timing']);
				},config['timing']);
			},config['timing']);
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
