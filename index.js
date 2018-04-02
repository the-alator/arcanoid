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

// var arr = [];
// arr[0] = 1;
// arr[1] = null;
// arr[2] = 3;
// arr[3] = undefined;
// arr[4] = 5;
// arr[5] = undefined;
// arr[100] = undefined;
//
// for(var val of arr)
//     console.log(val);


init();
setInterval(loop, 3);

/////////////////

function loop(){
    var nextBallX = ballX + dx;
    var nextBallY = ballY + dy;
    brickCollision(nextBallX,nextBallY);
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
function brickCollision(nextBallX, nextBallY){
    var ballArrX = (ballX / (brickWidth + brickHGap)) | 0;
    var ballArrY = (ballY / (brickHeight + brickVGap)) | 0;
    if(ballArrY > brickRows)
        return;
    var index;
    index = (ballArrY - 1) * brickColumns + ballArrX;
    if(bricks[index] != undefined && brickHorizontalSideCollision(bricks[index].x, bricks[index].x + brickWidth, bricks[index].y + brickHeight,nextBallX,nextBallY)) {
        destroyBrick(index);
        return;
    }

}
function brickCornerCollision(brickX, brickY, ballX, ballY){

}
function brickHorizontalSideCollision(brickStartX, brickEndX, brickY, ballX, ballY){
    if(ballX >= brickStartX && ballX <= brickEndX && Math.abs(ballY - brickY + 1) < radius){
        dy = -dy;
        return true;
    }
}
function brickVerticalSideCollision(brickStartY, brickEndY, brickX, ballX, ballY){
    if(ballY >= brickStartY && ballY <= brickEndY && Math.abs(ballX - brickX) < radius)
        dx = -dx;
}
function plaformCollision(){

}
function borderCollision(){

}
function destroyBrick(index){
    bricks[index] = null;
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
        if(bricks[a] == undefined)
            continue;
        draw.beginPath();
        draw.fillStyle="red";
        draw.rect(bricks[a].x,bricks[a].y,brickWidth,brickHeight);
        draw.fill();
        draw.closePath();
    }
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
