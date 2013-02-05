var car = function ( parent , css) {

	var parent = parent;
	var x = 0;
	var element = null;

	this.paint = function () {

		element = $('<div class="car" ></div>').append( '<img src="plane.png"/>' ).
		css(css); 
		parent.getCanvas().append(element);

	};

	this.moveLeft = function () {
		if( x > 0 ) {
			x-=50;
			element.css({left : x});
		}
	};

	this.moveRight = function () {
		if( (x+50) < 500 ) {
			x+=50;
			element.css({left : x});
		}
	};

	this.getX = function () {
		return x;
	}



};