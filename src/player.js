var player = new function() {
    this.x = 300;
    this.y = 550;
    this.img = new Image();
    this.img.src = "Sprites/Capture_perso_V.png";
    this.width = 60;
    this.height = 65;
    this.xSpeed = 6.7;
    this.ySpeed = 0;
    this.direction = "left";

    this.update = function() {
        if (!dead) {
            this.ySpeed += gravity;
            if (this.y <= screen.height / 2 - 200 && this.ySpeed <= 0) {
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].y -= this.ySpeed;
                }
            } else {
                this.y += this.ySpeed;
            }
            yDistanceTravelled -= this.ySpeed;
        }else {

            var imagefond = new Image();
            imagefond.src = 'Sprites/background-loose.jpg'
            var path = ctx.createPattern(imagefond, 'no-repeat')
            ctx.fillStyle = "black";
            ctx.fillRect(50, (screenHeight / 2) - 80, 300 , 180);
            ctx.fillStyle = path;
            ctx.fillRect(55, (screenHeight/2) - 75, 290, 170);
            ctx.font = "60px Scirpt";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("You Died!", screenWidth / 2, screenHeight / 2); 
            ctx.font = "36px Scirpt";
            ctx.fillText("Press r to restart", screenWidth / 2, (screenHeight / 2) + 50);
            
            player.hide()
        }

        //A key pressed
        if (holdingLeftKey) {
            this.direction = "left";
            this.img.src = "Sprites/Capture_perso_V.png";
            player.moveLeft();
        }
        //D key pressed 
        if (holdingRightKey) {
            this.direction = "right";
            this.img.src = "Sprites/Capture_perso_V.png";
            player.moveRight();
        }

        //Check for jump
        for (var i = 0; i < blocks.length; i++) {
            if (this.ySpeed >= 0) {
                if (this.x >= blocks[i].x - this.width + 15 && this.x <= blocks[i].x + blocks[i].width - 15 &&
                    this.y >= blocks[i].y - this.height && this.y <= blocks[i].y + blocks[i].height - this.height) {
                    if (blocks[i].type === "break") {
                        blocks[i] = 0;
                    } else if (blocks[i].monster === "coeur") {
                        blocks[i] = 0;
                        vie += 1;
                    } else if (blocks[i].monster !== 0) {
                        this.jump(blocks[i].powerup, blocks[i].type);
                        blocks[i] = 0;
                    } else {
                        this.jump(blocks[i].powerup, blocks[i].type);
                    }
                }
            } 

            if (this.y > blocks[i].y) {
                //Check for hit monster
                if (blocks[i].monster !== 0 && blocks[i].monster !== "coeur") {
                    if (this.x >= blocks[i].x - this.width + 15 && this.x <= blocks[i].x + blocks[i].width - 15 &&
                        this.y >= blocks[i].y - blocks[i].height && this.y <= blocks[i].y + blocks[i].height) {
                            if(vie == 1) {
                                vie -= 1
                                dead = true;
                            } else if (vie !== 0) {
                                vie -= 1;
                                blocks[i].monster = spawnBlock()
                                player.x = blocks[i].x
                                player.y = blocks[i].y
                            }
                    }
                }
            }
        }
        for (var i = 0; i < blocks.length; i++) {
        if (this.y > blocks[i].y) {
            //Check for hit monster
            if (blocks[i].monster == "coeur"){
                if (this.x >= blocks[i].x - this.width + 15 && this.x <= blocks[i].x + blocks[i].width - 15 &&
                    this.y >= blocks[i].y - blocks[i].height && this.y <= blocks[i].y + blocks[i].height) {
                        vie +=1
                        blocks[i] = 0;

                    }
                }
            }
        }
        for (var i = blocks.length-1; i > 0; i--) {
            if (blocks[i].y > screenHeight) {
                lowestBlock = i+1;
                break;
            }
        }

        if (this.y >= blocks[lowestBlock].y) {
            dead = true;
        }

        if (lowestBlock >= 45) {
            if (difficulty < 6) {
                difficulty += 1;
            }
            blockSpawner();
        }
    }
    
    this.jump = function(powerup, type) {
        this.ySpeed = -13.2;
        
        if (type === 0) {
            if (powerup === "spring") {
                this.ySpeed = -20;
            }
        } 
    }

    this.moveLeft = function() {
        this.x -= this.xSpeed;
        if (this.x <= -this.width) {
            this.x = screenWidth;
        }
    }

    this.moveRight = function() {
        this.x += this.xSpeed;
        if (this.x >= screenWidth) {
            this.x = -this.width;
        }
    }

    this.draw = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
