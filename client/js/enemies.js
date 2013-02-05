var enemies = function ( parent , css , id, x) {

	var parent = parent;
	var y = 0;
	var x = x;
	var element = null;

	this.paint = function () {

		element = $('<div  id="'+id+'" class="enemies" ></div>').append( '<img src="planeIn.png"/>' ).
		css(css); 
		parent.getCanvas().append(element);

	};

	this.move = function () {
		y+=50;
		element.css({top: y});

	};

	this.getY = function () {
		return y;
	};

	this.getX = function () {
		return x;
	}

	this.delete = function () {
		element.remove();
	}
}