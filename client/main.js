var canvas, context;
var connection = new WebSocket("ws://localhost:12345");
var mouseDown = false;
var currentStroke = [];

window.onload = function () {
	//SET VARIABLES
	canvas = document.getElementById("paper");
	context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//ADD EVENT LISTENERS
	canvas.addEventListener("mousedown", e => mouseDown = true);
	canvas.addEventListener("mouseup", release);
	canvas.addEventListener("mousemove", mouseMove);
	//CLEAR CANVAS
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
	connection.send(JSON.stringify(currentStroke));
	//reset stroke
	context.beginPath();
	currentStroke = [];
}

connection.onmessage = function (message) {
	var data = JSON.parse(message.data);
	console.log(data);
	context.beginPath();
	for (var point of data) {
		context.lineTo(point[0], point[1]);
	}
	context.stroke();
	context.beginPath();
}

/* RESIZING THE CANVAS CLEARS EVERYTHIN
window.onresize = function () {
	savedState = context.imageData;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
*/