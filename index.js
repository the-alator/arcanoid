var canvas = document.getElementById("mainCanv");
var draw = canvas.getContext("2d");

var gameStatus;
var gameStatuses = {RUNNING: 1, STOPPED: 2 };

var ballX, ballY ;
var dx, dy;
var radius = 10;
var ballState;
var ballStates = {STATIC: 1, MOVING: 2, INVISIBLE:3};

var brickColumns=10;
var brickRows=6;

var brickWidth;
var brickHeight;
var brickVGap;
var brickHGap;

var bricks  = [];
var brickCount = brickColumns * brickRows;

var platformX, platformY;
var platformWidth, platformHeight;
var basicPlatformHeight = 0;
var platformHeightDecr;
var size_life = 3;

///////////////////////////

init();
var interval = setInterval(loop, 1);

/////////////////

function loop(){
    var nextBallX = ballX + dx;
    var nextBallY = ballY + dy;
    brickCollision(nextBallX,nextBallY);
    borderCollision(nextBallX,nextBallY);
    platformCollision(nextBallX,nextBallY);

    //go to next step
    if(ballState == ballStates.MOVING) {
        ballX += dx;
        ballY += dy;
    }
    if(gameStatus === gameStatuses.RUNNING)
        repaint();
}
function brickCollision(nextBallX, nextBallY){
    var ballArrX = (ballX / (brickWidth + brickHGap)) | 0;
    var ballArrY = (ballY / (brickHeight + brickVGap)) | 0;
    if(ballArrY > brickRows)
        return;
    var index;
    index = (ballArrY - 1) * brickColumns + ballArrX - 1;
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x + brickWidth, bricks[index].y + brickHeight, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }

    index = (ballArrY - 1) * brickColumns + ballArrX;
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x, bricks[index].y + brickHeight, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x + brickWidth, bricks[index].y + brickHeight, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }
    if(bricks[index] != undefined && brickHorizontalSideCollision(bricks[index].x, bricks[index].x + brickWidth, bricks[index].y + brickHeight,nextBallX,nextBallY)) {
        destroyBrick(index);
        return;
    }

    index = (ballArrY - 1) * brickColumns + ballArrX + 1;
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x, bricks[index].y + brickHeight, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }

    index = ballArrY * brickColumns + ballArrX + 1;
    if(bricks[index] != undefined && brickVerticalSideCollision(bricks[index].y, bricks[index].y + brickHeight, bricks[index].x + brickWidth,nextBallX,nextBallY)) {
        destroyBrick(index);
        return;
    }
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x, bricks[index].y, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x, bricks[index].y + brickHeight, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }

    index = (ballArrY + 1) * brickColumns + ballArrX + 1;
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x, bricks[index].y, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }

    index = (ballArrY + 1) * brickColumns + ballArrX;
    if(bricks[index] != undefined && brickHorizontalSideCollision(bricks[index].x, bricks[index].x + brickWidth, bricks[index].y,nextBallX,nextBallY)) {
        destroyBrick(index);
        return;
    }
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x, bricks[index].y, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x + brickWidth, bricks[index].y, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }

    index = (ballArrY + 1) * brickColumns + ballArrX - 1;
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x + brickWidth, bricks[index].y, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }

    index = ballArrY * brickColumns + ballArrX - 1;
    if(bricks[index] != undefined && brickVerticalSideCollision(bricks[index].y, bricks[index].y + brickHeight, bricks[index].x,nextBallX,nextBallY)) {
        destroyBrick(index);
        return;
    }
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x + brickWidth, bricks[index].y, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }
    if(bricks[index] != undefined && brickCornerCollision(bricks[index].x + brickWidth, bricks[index].y + brickHeight, nextBallX, nextBallY)) {
        destroyBrick(index);
        return;
    }
}
function brickCornerCollision(brickX, brickY, ballX, ballY){
    var math = Math.sqrt(Math.pow(brickX - ballX, 2) + Math.pow(brickY - ballY, 2));
    if(interval == 0)
        console.log(math + " ballX " + ballX + " ballY " + ballY + " brickX " + brickX + " brickY " + brickY);
    if(math < radius){
        if(Math.abs(brickY - ballY) == Math.abs(brickX - ballX)){
            dx = -dx;
            dy = -dy;
        }
        else if(Math.abs(brickY - ballY) > Math.abs(brickX - ballX))
            dy = -dy;
        else
            dx = -dx;

        console.log("amazing!");
        return true;
    }

}
function brickHorizontalSideCollision(brickStartX, brickEndX, brickY, ballX, ballY){
    if(ballX >= brickStartX && ballX <= brickEndX && Math.abs(ballY - brickY + 1) < radius){
        dy = -dy;
        return true;
    }
}
function brickVerticalSideCollision(brickStartY, brickEndY, brickX, ballX, ballY){
    if(ballY >= brickStartY && ballY <= brickEndY && Math.abs(ballX - brickX) < radius){
        dx = -dx;
        return true;
    }
}
function platformCollision(nextBallX, nextBallY){
    if(brickHorizontalSideCollision(platformX, platformX + platformWidth, platformY, nextBallX, nextBallY)) {
        console.log("Collision at " + (ballX - platformX) + " with platformX " + platformX + " ballX " + ballX + " platformWidth " + platformWidth);
        dx = -Math.cos(((ballX - platformX) / platformWidth) * Math.PI);
        dy = -(2 - Math.abs(dx));
        console.log("Calc angle " + (((ballX - platformX) / platformWidth) * 180));
        console.log(dx);
    }
}
function borderCollision(ballX, ballY){
    if(ballX - radius <= 0 || ballX + radius >= canvas.width)
        dx = -dx;
    if(ballY - radius <= 0)
        dy = -dy;
    if(ballY + radius >= canvas.height) {
        size_life--;
        resizePlatform();
        if(size_life < 0)
            gameOver();
        createBall();

    }

}
function destroyBrick(index){
    bricks[index] = null;
    console.log("splitter");
    brickCount--;
    if(brickCount <= 0)
        gameWin();
}

var fontSize = canvas.height / 20;
var mainTextY = canvas.height / 6;
function endGame(){
    gameStatus = gameStatuses.STOPPED;
    document.removeEventListener("mousemove",mouseMoved);
    document.removeEventListener("keydown",keyPressed);
    clearInterval(interval);
    draw.globalAlpha = 0.2;
    destroyBall();
    repaint();

    draw.globalAlpha = 1;
    draw.font = fontSize + "px Comic Sans MS";
    var restartText = "Press LMB to restart game";
    draw.fillStyle = "red";
    draw.fillText(restartText,(canvas.width - draw.measureText(restartText).width) / 2, canvas.height - fontSize - canvas.height / 15);
}
function gameOver(){
    endGame();
    var endText = "You lost!";
    draw.fillText(endText, (canvas.width - draw.measureText(endText).width) / 2,mainTextY);
}
function gameWin(){
    endGame();
    var endText = "You won! Congratulations!";
    draw.fillStyle = "green";
    draw.fillText(endText, (canvas.width - draw.measureText(endText).width) / 2,mainTextY);
}


function mouseDown(event){
    if(document.documentElement.clientWidth/8 < event.x && document.documentElement.clientWidth/8 + canvas.width > event.x &&
        document.documentElement.clientHeight/12 < event.y && document.documentElement.clientHeight/12 + canvas.height > event.y){
        if(gameStatus === gameStatuses.RUNNING){
            if(ballState === ballStates.STATIC) {
                ballState = ballStates.MOVING;
            }
        }else{
            document.removeEventListener("mousedown",mouseDown);
            document.location.reload();
        }

    }


}
function keyPressed(event){
    if(event.key === 'o'){
        gameOver();
    }
    if(event.key === 'w'){
        gameWin();
    }
    if(event.key === 'g'){
        if(interval != 0){
            clearInterval(interval);
            interval = 0;
        }
        else
            interval = setInterval(loop,1);
    }
    if(interval === 0){
        if(event.key == 1){
            dx = -1;
            dy = 1;
        }
        else if(event.key == 7){
            dx = -1;
            dy = -1;
        }
        else if(event.key == 9){
            dx = 1;
            dy = -1;
        }
        else if(event.key == 3){
            dx = 1;
            dy = 1;
        }
        else if(event.key == 5){
            loop();
            console.log("here");
        }
    }

}
function mouseMoved(event){
    var tempPlatformX = event.x - platformWidth / 2 - document.documentElement.clientWidth/8;
    if(tempPlatformX <= 0)
        setPlatformX(0);
    else
    if(tempPlatformX >= canvas.width - platformWidth)
        setPlatformX(canvas.width - platformWidth);
    else
        setPlatformX(tempPlatformX);
    if(interval === 0)
        repaint();
    function setPlatformX(x){
        platformX = x;
        if(ballState === ballStates.STATIC)
            ballX = platformX + (platformWidth / 2);
    }
}

function init(){
    document.addEventListener("mousemove",mouseMoved);
    document.addEventListener("keydown",keyPressed);
    document.addEventListener("mousedown",mouseDown);
    createBricks();
    createPlatform();
    createBall();
    gameStatus = gameStatuses.RUNNING;
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
            currentBrick.num = a * brickColumns + b + 1;
            bricks.push(currentBrick);
        }
    }
}
function createPlatform(){
    platformWidth = canvas.width / 7;
    platformHeight = platformWidth / 10;
    basicPlatformHeight = platformHeight;
    platformHeightDecr = platformHeight / (size_life + 1);
    platformX = (canvas.width - platformWidth) / 2;
    platformY = canvas.height - basicPlatformHeight * 2;
}
function resizePlatform(){
    platformHeight -= platformHeightDecr;
    platformY = canvas.height - basicPlatformHeight - platformHeight;
}
function createBall(){
    ballX =  platformX + (platformWidth / 2);
    ballY = platformY - basicPlatformHeight;
    dx = 1;
    dy = -1;
    ballState = ballStates.STATIC;
}
function destroyBall(){
    ballState = ballStates.INVISIBLE;
}

function repaint(){
    draw.clearRect(0,0,canvas.width, canvas.height);
    if(ballState !== ballStates.INVISIBLE) {
        drawBall();
    }
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
        draw.font = (brickHeight - brickHeight / 3) + "px Georgia";
        draw.fillStyle = "yellow";
        draw.fillText(bricks[a].num,bricks[a].x + (brickWidth - draw.measureText(bricks[a].num).width)/2, bricks[a].y + brickHeight / 3 * 2 );
    }
}
function drawPlatform(){
    draw.beginPath();
    draw.fillStyle="orange";
    draw.rect(platformX, platformY, platformWidth, platformHeight);
    draw.fill();
    draw.closePath();
}
