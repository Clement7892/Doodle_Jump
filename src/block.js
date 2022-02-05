function block() {
    this.x;
    this.y;
    this.width = 90;
	this.height = 50;
    this.powerup;
    this.type;
    this.monster;
    this.direction = "right";
    this.moveTime = 10;
    this.img = new Image();
    this.img.src = "Sprites/ovnijeurecad.png";
    

    this.draw = function() {
        if (this.monster === 0) {
            if (this.type === "break") {
                breakFunctions[this.type].draw(this.x, this.y, this.width, this.height);
            } else if (this.type === "sideways") {
                sideFunctions[this.type].draw(this.x, this.y, this.width, this.height);
            } else {
                ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
        } else if (this.monster === "smallRed") {
            monsterFunctions[this.monster].draw(this.x, this.y, this.width, this.height);
        } else {
            coeurFunctions[this.monster].draw(this.x, this.y, this.width, this.height)
        }

        if (this.powerup === "spring") {
            springFunctions[this.powerup].draw(this.x + 35, this.y -10, this.width, this.height);
        }
    }

    this.update = function() {
        if (this.type === "sideways") {
            if (this.x >= screenWidth - this.width) {
                this.direction = "left";
            } else if (this.x <= 0) {
                this.direction = "right";
            }

            if (this.direction === "right") {
                this.x += 2.5;
            } else {
                this.x -= 2.5;
            }
        }

        if (this.monster === "smallRed") {
            if (this.direction === "right") {
                this.x += 1;
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "left";
                    this.moveTime = 10;
                }
            } else {
                this.x -= 1;
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "right";
                    this.moveTime = 10;
                }
            }
        }
    }
}
