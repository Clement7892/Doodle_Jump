var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var screenWidth = 400;
var screenHeight = 700;
c.width = screenWidth;
c.height = screenHeight;
document.body.appendChild(c);

window.addEventListener('keydown',this.keydown,false);
window.addEventListener('keyup',this.keyup,false);
const StartGameBtn = document.querySelector('#StartGameBtn')
const Setting = document.querySelector('#Setting')
const MenuEl = document.querySelector('#MenuEl')
const ExitGame = document.querySelector('#ExitGame')
const AboutGame = document.querySelector('#AboutGame')

var playing = false;
var startButton;
var imageStart = new Image();
imageStart.src = 'Sprites/bouton start.png'
ctx.drawImage(imageStart, 300, 200);
//Variables
const gravity = 0.34;
var holdingLeftKey = false;
var holdingRightKey = false;
var keycode;
var dead = false;
var difficulty = 0;
var lowestBlock = 0;
var score = 0;
var yDistanceTravelled = 0;
var vie = 6;
var blocks = [];
var powerups = [];
var highScore = 0;
//Time variables
var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function keydown(e) {
    if (e.keyCode === 37) {
        holdingLeftKey = true;
    }   else if (e.keyCode === 39) {
        holdingRightKey = true;
    }

    if (e.keyCode === 82 && dead) {
        vie = 6
        highScore = score
        blocks = [];
        lowestBlock = 0;
        difficulty = 0;
        score = 0;
        yDistanceTravelled = 0;
        player.springBootsDurability = 0;

        blocks.push(new block);
        blocks[0].x = 300;
        blocks[0].y = 650;
        blocks[0].monster = 0;
        blocks[0].type = 0;
        blocks[0].powerup = 0;

        blockSpawner();
        
        player.x = 300;
        player.y = 550;


        dead = false;
    }
}

function keyup(e) {
    if (e.keyCode === 37) {
        holdingLeftKey = false;
    } else if (e.keyCode === 39) {
        holdingRightKey = false;
    }
}

function showScore() {
    if (yDistanceTravelled > score) {
        score = Math.round(yDistanceTravelled / 10);
    }

    ctx.font = "36px Arial";
    ctx.fillStyle = "White";
    ctx.textAlign = "left";
    ctx.fillText(score, 15, 680); 
}

function showLife() {
  var  coeurr = 15
    vie = vie
    var vieimg = new Image();
    vieimg.src = 'Sprites/powerups/coeur.png'
    for(let i = vie-1; i>= 0;i--){
        ctx.drawImage(vieimg, coeurr, 10, 25, 25) 
        coeurr += 25
    }

}

function showFps(){
    var thisLoop = new Date();
    var fps = 1000 / (thisLoop - then);
    lastLoop = thisLoop;
    ctx.font = "25px Arial";
    ctx.fillStyle = "#0DFF16FF";
    ctx.textAlign = "";
    ctx.fillText(Math.ceil(fps), 360, 30); 
}

blocks.push(new block);
blocks[0].x = 300;
blocks[0].y = 650;
blocks[0].monster = 0;
blocks[0].type = 0;
blocks[0].powerup = 0;

blockSpawner();

function loop() {
    requestAnimationFrame(loop);
    if (vie == 0) {
        dead = true
    }
    //This sets the FPS to 60
    now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
        var backgroundImage = new Image();
        backgroundImage.src = "Sprites/background.png";
        ctx.drawImage(backgroundImage, 0, 0, screenWidth, screenHeight) 

        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i] !== 0) {
                blocks[i].update();
                blocks[i].draw();
            }
        }
        player.update();
        player.draw();
        showLife();
        showScore();
        showFps();
        ctx.fill();
        then = now - (delta % interval);
    }
}

loop()

// StartGameBtn.addEventListener('click', (event) => {
//     loop();
//     MenuEl.style.display = 'none'
// } )

// Setting.addEventListener('click', (event) => {
//     loop();
//     console.log("paramêtre");
// })

// ExitGame.addEventListener('click', (event) => {
//     close()
// })

// AboutGame.addEventListener('click', (event) => {
//     var popup = document.getElementById("AboutGameTouch")
// })
