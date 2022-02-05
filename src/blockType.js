function spawnBlock() {
    var blockChances = {
        "break": 15,
        "sideways": Math.round(10 / difficulty)
    };

    if (Math.round(Math.random() * blockChances["break"]) === 0) {
        return "break";
    } else if (Math.round(Math.random() * blockChances["sideways"]) === 0) {
        return "sideways";
    }
    return 0;
}

var breaks = new function() {
    this.img = new Image();
    this.img.src = "Sprites/ovnijeurecadcassable.png";
    this.xDif = 10;
    this.yDif = -5;
    this.width = 90;
    this.height = 50;

    this.draw = function(blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

var breakFunctions = {
    "break": breaks
}

var side = new function() {
    this.img = new Image();
    this.img.src = "Sprites/ovnijeurecadmouv.png";
    this.xDif = 10;
    this.yDif = -5;
    this.width = 90;
    this.height = 50;

    this.draw = function(blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}
var sideFunctions = {
    "sideways": side
}