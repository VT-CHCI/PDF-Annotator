// When modified, copy into pdfjs/web
'use strict'
// var canvasDiv = document.getElementById('viewer'); //The PDF Viewer
var context = canvas.getContext('2d');

// Width of entire document
var canvasWidth = $('pdfViewer').width();;
var canvasHeight = $('.pdfViewer').height();;

// canvas = document.createElement('canvas');
var canvas = $('canvas');
console.log(canvas);
// canvas.setAttribute('width', canvasWidth);
// canvas.setAttribute('height', canvasHeight);
// canvas.setAttribute('z-index', 1000);
// canvas.setAttribute('id', 'canvas');
// canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}

$('#page1').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#page1').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#page1').mouseup(function(e){
  paint = false;
});

$('#page1').mouseleave(function(e){
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";

var curColor = colorPurple;
var clickColor = new Array();

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  // ^^ Clears the canvas

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;

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
}

$('.clear').click(function() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickColor = new Array();
});

$('.purple').click(function() {
  curColor = colorPurple;
})

$('.green').click(function() {
  curColor = colorGreen;
})

$('.yellow').click(function() {
  curColor = colorYellow;
})
