var board = function (element) {

	var myCar;
	var element = element;
	var thread;
	var threadTime = 1000;
	var that = this;
	var myEnemies = new Array();
	var score = 0;
	var level = 1;
	var targets = new Array ();
	targets[1] = 300;
	targets[2] = 900;
	targets[3] = 1600;


	this.paint = function () {
		element.css({position: "relative"});
		myCar = new car ( this , { left : '0px' , bottom : '0px' , position : 'absolute'});
		myCar.paint();
		printLevel();
		run();
		
	}

	this.getCanvas = function () {
		return element;
	}

	this.keypress = function (event) {
		if ( event.which == 37 ) {
			myCar.moveLeft();
		} 
		if ( event.which == 39 ) {
			myCar.moveRight();
		}
		if ( event.which == 27) {
			this.end();
		} 
	};

	function run () {
		thread = setInterval(function(){
			moveEnemies();
			if( haveCrash( myEnemies[0] , myCar ) ){
				paintCrash();
				that.end();
				alert('Perdiste');
				return;
			}
			var ran = parseInt ( Math.random() * 5 );
			var en = new enemies ( that , {left: ran*50, top: '0px', position: 'absolute'}, myEnemies.length, ran*50);
			en.paint();
			myEnemies.push( en );
			score+= level*10;
			printScore();
			evaluateScore();
		}, threadTime);
		
	};

	function moveEnemies () {
		var auxDelete = new Array();
		for ( var i in myEnemies ) {
			myEnemies[i].move();
			var yI = myEnemies[i].getY();
			if ( yI>=500 ) {
				auxDelete.push(i);
			}
		}
		for (var i in auxDelete) {
			myEnemies[auxDelete[i]].delete();
			myEnemies.splice(auxDelete[i], 1);
		}
	}

	this.end = function () {
		window.clearInterval( thread );
	}

	function haveCrash( enemie , car1 ) {
		if(enemie == null || car1 == null)
			return;
		var yE = enemie.getY();
		var xE = enemie.getX();
		var xC = car1.getX();
		console.log("yEn: "+yE+"  xE:  "+xE+"  xC:  "+xC);
		return ( yE == 450 && xE == xC );
		
	};

	function paintCrash () {
		var x = myCar.getX();
		var ea = $('<div class="crash" style="height:50px;width:50px"><img src="explosion.gif" style="height:100%;width:100%"></div>').
		css({position:"absolute",bottom:"0px", left: x, zIndex:20});
		$(element).append(ea);
	}

	function clean () {
		myEnemies = new Array ();
		myCar = null;
		$('.enemies').remove();
		$('.car').remove();
	};

	function evaluateScore () {
		if ( score >= targets[level] ) {
			
			that.end();
			clean();
			score=0;
			level++;
			threadTime/=3;
			alert('Nivel superado');

			if (level<=3) {
				that.paint();
			} else {
				alert('Felicitaciones ha superado todos los niveles');
			}
			
		}
	}

	function printScore () {
		$('#score').html(score);
	}

	function printLevel () {
		$('#level').html(level);
	}

	this.reset = function () {
		that.end();
		clean();
		score=0;
		level=1;
		threadTime= 1000;
		$('.crash').remove();
		printLevel();
		printScore();
	}

};