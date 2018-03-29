
var canvas = document.getElementById("mainCanv");
var draw = canvas.getContext("2d");

var x = canvas.width/2, y = canvas.height - canvas.height/4;
var dx = 1, dy = 1;
var radius = 10;

var brickColumns=8;
var brickRows=3;

var brickWidth=125;
var brickHeight=25;
// var brickX=20;
// var brickY=30;
var brickVGap=15;
var BASIC_BRICK_H_GAP=20;
var brickHGap=20;

var bricks  = [];


///////////////////////////

createBricks();
setInterval(loop, 3);

/////////////////

function loop(){
    //check next step
    if(x + dx < 0 || x + dx > canvas.width)
        dx = -dx;
    if(y + dy < 0 || y + dy > canvas.height)
        dy = -dy;
    //go to next step
    x += dx;
    y += dy;
    repaint();
}
function repaint(){
    draw.clearRect(0,0,canvas.width, canvas.height);

    drawBall();
    drawBricks();
}
function drawBall(){
    draw.beginPath();
    draw.arc(x, y, radius, 0, Math.PI*2,false);
    draw.fillStyle = "green";
    draw.fill();
    draw.closePath();
}
function drawBricks(){
    for(var a = 0; a < bricks.length; a++){
        draw.beginPath();
        console.log(bricks.length + "brldb");
        console.log("DRW:" + bricks[a].x + " " + bricks[a].y);
        draw.rect(bricks[a].x,bricks[a].y,brickWidth,brickHeight);
        draw.fillStyle="red";
        draw.fill();
        draw.closePath();
    }
    // for(var i=0;i<brickRows;i++){
    //     var brickY1=brickY+i*(brickHeight+brickVGap);
    //     for(var j=0;c<brickRows;j++){
    //         var brickX1=brickX+i*(brickWidth+brickHGap);
    //         draw.beginPath();
    //         draw.rect(brickX1,brickY1,brickWidth,brickHeight);
    //         draw.fillStyle="#B8860B";
    //         draw.fill();
    //         draw.closePath();
    //     }
    // }
}


function createBricks(){
    var currentBrick;
    // brickHGap = (canvas.width / 5) /  (brickColumns + 1);
    // brickVGap = (canvas.height / 2 * 0.3) /  (brickRows + 1);
    // brickWidth = canvas.width * 0.8 / brickColumns;
    // brickHeight = canvas.height / 2 * 0.7 / brickColumns;
    for(var a = 0; a < brickRows; a++){
        for(var b = 0; b < brickColumns; b++){
           // currentI = brickRows * a + b;
            currentBrick = {};
            currentBrick.x = brickHGap + brickHGap*b + brickWidth*b;
            currentBrick.y = brickVGap + brickVGap*a + brickHeight*a;
            console.log( currentBrick.x);
            console.log( currentBrick.y);
            console.log("\n");
            bricks.push(currentBrick);
        }
    }
    console.log(bricks.length + "brl");
}
