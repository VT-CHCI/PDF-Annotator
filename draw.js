
var canvasWidth = 800;
var canvasHeight = 400;


// var pdf = document.getElementById('the-canvas');
// pdf.setAttribute('width', canvasWidth);
// pdf.setAttribute('height', canvasHeight);


var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

$('#canvas').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
    
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

// $('#pdf').mouseup(function(){console.log($(".selection-highlight"))});

$('#canvas').mouseleave(function(e){
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var curTool = "marker";
var size = 5;
var shape = "round";

var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffff00";
var colorBlack = "#000000";

var curColor = colorBlack;
var clickColor = new Array();

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y); //space for the buttons up top
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#df4b26";
  context.lineJoin = shape;
  context.lineWidth = size;
      
  for(var i=0; i < clickX.length; i++) {    
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.stroke();
  }
  if(curTool == "highlighter") {
    context.globalAlpha = 0.3;
    context.drawImage(0, 0, canvasWidth, canvasHeight);
  }
  context.globalAlpha = 1;
}

function drawToggle() {
  $('#draw').toggleClass("down");
  $('#canvas').toggleClass("static");
}

$('.clear').click(function() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickColor = new Array();
});

$(".bbb").click(function() {
  console.log("this has been clicked");
});

$('.black').click(function() {
  curColor = colorBlack;
  curTool = "marker";
  size = 5;
  shape = "round";
})

$('.purple').click(function() {
  curColor = colorPurple;
  curTool = "marker";
  size = 5;
  shape = "round";
})

$('.green').click(function() {
  curColor = colorGreen;
  curTool = "marker";
  size = 5;
  shape = "round";
})

$('.yellow').click(function() {
  curColor = colorYellow;
  curTool = "marker";
  size = 5;
  shape = "round";
})

$('.highlight').click(function() {
  curColor = colorYellow;
  curTool = "highlighter";
  size = 15;
  shape = "square";
})

