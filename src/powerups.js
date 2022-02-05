function spawnPowerup() {
    var powerupChances = {
        "spring": 20,
    };

    if (Math.round(Math.random() * powerupChances["spring"]) === 0) {
        return "spring";
    }
    return 0;
}
var spring = new function() {
    this.img = new Image();
    this.img.src = "Sprites/powerups/trampo.png";
    this.xDif = -10;
    this.yDif = -5;
    this.width = 40;
    this.height = 20;

    this.draw = function(blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

var springFunctions = {
    "spring": spring
}
