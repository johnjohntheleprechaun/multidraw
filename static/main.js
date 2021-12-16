var canvas, context;
var mouseDown = false;
var currentStroke = [];
var socket = io({"forceNew": true});
var lines = 0;
const max = 10;

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
		lines += 1;
		if (lines > max){
			sendDraw();
		}
	}
}

function release(e) {
	mouseDown = false;
	lines = 0;
	var event = JSON.stringify(currentStroke)
	socket.emit("draw", event);
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

function sendDraw(){
	lines = 0;
	var event = JSON.stringify(currentStroke)
	socket.emit("draw", event);
}

socket.on("draw", function (data){
	data = JSON.parse(data);
	console.log(data);
	context.beginPath();
	for (var point of data) {
		context.lineTo(point[0], point[1]);
	}
	context.stroke();
	context.beginPath();
})