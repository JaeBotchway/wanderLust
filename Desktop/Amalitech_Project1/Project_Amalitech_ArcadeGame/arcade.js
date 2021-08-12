var ballX = 50;                 //ball
var ballSpeedX = 10;          //ballspeed
var ballY = 50;
var ballSpeedY = 4;

var Paddle1Y = 250;               //paddle on Y axis(vertical) for player 1 
var Paddle2Y = 250;
const PaddleHeight = 100;           //sets height of paddle to 100
const PaddleWidth = 10;

const WINNINGscore = 5;


var Player1Score = 0;
var Player2Score = 0;

var canvas;                        //define canvas area (thus height and width)
var canvasContext;                 //states it to be in 2d



function calculateMousePos(evt)                  //calculate the position of mouse pointer within frame by calculating area of canvas and entire page
{
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY,
    };
}


window.onload = function () {

    canvas = document.getElementById('arcadeCanvas');               //calls Id arcadeCanvas and stores its value in canvas
    canvasContext = canvas.getContext('2d');                         // in 2d

    var framesPerSecond = 30;                                                                         //show frame every 30sec
    setInterval(function cal() { moveEverything(); drawEverything(); }, 1000 / framesPerSecond);            //calls the movement thus how fast the ball moves in the frame per second


    canvas.addEventListener('mousemove', function (evt) {                                                                                //this function calls calcaulateMousePos, and paddleY moves in direction of mouse
        var mousePos = calculateMousePos(evt);
        Paddle1Y = mousePos.y - (PaddleHeight / 2);

    });

}


function ballReset() {                               //function reset ball direction or position
    ballSpeedX = -ballSpeedX;                           //tells it to go back in the opp direction
    ballX = canvas.width / 2;                               //the width of canvas divided by 2, hence ball bounce back automatically when it hits the sides
    ballY = canvas.height / 2;                             //height of canvas divided by 2 hence ball bances back automaticall when it hits the top
}

function paddle2Movement() {
    var Paddle2YCenter = Paddle2Y + (PaddleHeight / 2);
    if (Paddle2YCenter < ballY - 35) {
        Paddle2Y += 6;
    }
    else if (Paddle2YCenter > ballY + 35) {
        Paddle2Y -= 6;
    }

}

function moveEverything() {

    paddle2Movement();
    //move function, which determines the speed and movement
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX < 0)                                                            //if ball is less than o(which starts from the left)ball bounces back accross the screen
    {
        if (ballY > Paddle1Y && ballY < Paddle1Y + PaddleHeight)            //as ballbounces back from the left side ,if ball is above paddle or below paddle
        {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (Paddle1Y + PaddleHeight / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            ballReset();
            Player2Score++;
        }
    }
    if (ballX > canvas.width) {
        if (ballY > Paddle2Y && ballY < Paddle2Y + PaddleHeight)            //as ballbounces back from the left side ,if ball is above paddle or below paddle
        {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (Paddle2Y + PaddleHeight / 2);
            ballSpeedY = deltaY * 0.35;

        } else {
            ballReset();
            Player1Score++;
        }
    }


    if (ballY < 0) { ballSpeedY = -ballSpeedY; }

    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {                                                                 //drawing canvas
    canvasContext.fillStyle = 'black';                                                      // defines color of canvas are
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);                                // defines area of canvas from (left,top,width,height)
    canvasContext.fillStyle = 'white';                                                     //draws player 1 paddle as white 
    canvasContext.fillRect(0, Paddle1Y, PaddleWidth, PaddleHeight);                                    //defines size of paddle and location
    canvasContext.fillStyle = 'green';                                                     //draws color of player 2 paddle as yellow
    canvasContext.fillRect((canvas.width - 10), Paddle2Y, PaddleWidth, PaddleHeight);                      //defines size of paddle and location
    canvasContext.fillStyle = 'yellow';                                                     //color of ball
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);                                     //function to draw shape of ball using radius of a circle     
    canvasContext.fill();
    //canvasContext.fillRect(ballX,100,10,10);
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(Player1Score, 100, 100);
    canvasContext.fillStyle = 'green';
    canvasContext.fillText(Player2Score, canvas.width - 100, 100);


}