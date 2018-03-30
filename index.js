var canvas = document.getElementById("mainCanv");
var draw = canvas.getContext("2d");

var ballX = canvas.width/2, ballY = canvas.height - canvas.height/4;
var dx = 1, dy = -1;
var radius = 10;

var brickColumns=10;
var brickRows=6;

var brickWidth;
var brickHeight;
var brickVGap;
var brickHGap;

var bricks  = [];

var platformX, platformY;
var platformWidth, platformHeight;
///////////////////////////

init();
setInterval(loop, 3);

/////////////////

function loop(){
    //check next step
    if(ballX + dx < 0 || ballX + dx > canvas.width)
        dx = -dx;
    if(ballY + dy < 0 || ballY + dy > canvas.height)
        dy = -dy;
    //go to next step
    ballX += dx;
    ballY += dy;
    repaint();
}
function repaint(){
    draw.clearRect(0,0,canvas.width, canvas.height);

    drawBall();
    drawBricks();
    drawPlatform();
}
function drawBall(){
    draw.beginPath();
    draw.fillStyle = "green";
    draw.arc(ballX, ballY, radius, 0, Math.PI*2,false);
    draw.fill();
    draw.closePath();
}
function drawBricks(){
    for(var a = 0; a < bricks.length; a++){
        draw.beginPath();
        draw.fillStyle="red";
        draw.rect(bricks[a].x,bricks[a].y,brickWidth,brickHeight);
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
function drawPlatform(){
    draw.beginPath();
    draw.fillStyle="orange";
    draw.rect(platformX, platformY, platformWidth, platformHeight);
    draw.fill();
    draw.closePath();
}

function init(){
    document.addEventListener("mousemove",mouseMoved);
    createBricks();
    createPlatform();
}

function mouseMoved(event){
    var tempPlatformX = event.x - platformWidth / 2 - document.documentElement.clientWidth/8;
    if(tempPlatformX <= 0)
        platformX = 0;
    else
    if(tempPlatformX >= canvas.width - platformWidth)
        platformX = canvas.width - platformWidth;
    else
        platformX = tempPlatformX;
}
function createBricks(){
    var currentBrick;
    brickHGap = (canvas.width / 10) /  (brickColumns + 1);
    brickWidth = (canvas.width - canvas.width / 10) / brickColumns;
    brickHeight = brickWidth / 5;
    brickVGap = brickHeight / 2;
    for(var a = 0; a < brickRows; a++){
        for(var b = 0; b < brickColumns; b++){
            currentBrick = {};
            currentBrick.x = brickHGap + brickHGap*b + brickWidth*b;
            currentBrick.y = brickVGap + brickVGap*a + brickHeight*a;
            bricks.push(currentBrick);
        }
    }
}
function createPlatform(){
    platformWidth = canvas.width / 7;
    platformHeight = platformWidth / 10;
    platformX = (canvas.width - platformWidth) / 2;
    platformY = canvas.height - platformHeight * 2;
}
