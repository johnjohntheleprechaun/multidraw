var canvas, context;
var mouseDown = false;
var currentStroke = [];

window.onload = function () {
	//Set variables
	canvas = document.getElementById("paper");
	context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//Add event listeners
	canvas.addEventListener("mousedown", e => mouseDown = true);
	canvas.addEventListener("mouseup", release);
	canvas.addEventListener("mousemove", mouseMove);
	//Clear canvas
	clearCanvas();
}

function clearCanvas() {
	context.fillStyle = "wheat";
	context.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
}

function mouseMove(e) {
	if (mouseDown) {
		//add to currentStroke
		var bounding = canvas.getBoundingClientRect();
		var relX = e.clientX - bounding.left;
		var relY = e.clientY - bounding.top;
		currentStroke.push([relX, relY]);
		//draw stroke
		context.lineTo(relX, relY);
		context.stroke();
	}
}

function release(e) {
	mouseDown = false;
	//send stroke
	/*CODE NEEDED*/

	//reset stroke
	context.beginPath();
	currentStroke = [];
}

/* RESIZING THE CANVAS CLEARS EVERYTHIN
window.onresize = function () {
	savedState = context.imageData;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
*/