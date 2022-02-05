function spawnMonster() {
    var monsterChances = {
        "smallRed": 5,
        "coeur": 5,
    };

    if (Math.round(Math.random() * monsterChances["smallRed"]) === 0) {
        return "smallRed";
    } else if (Math.round(Math.random() * monsterChances["coeur"]) === 0) {
        return "coeur";
    }
    return 0;
}

var smallRed = new function() {
    this.img = new Image();
    this.img.src = "Sprites/Monsters/chasseur_Vince.png";
    this.xDif = 10;
    this.yDif = -5;
    this.width = 60;
    this.height = 60;

    this.draw = function(blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

var monsterFunctions = {
    "smallRed": smallRed
}

var coeur = new function() {
    this.img = new Image();
    this.img.src = "Sprites/powerups/coeur.png";
    this.xDif = 10;
    this.yDif = -5;
    this.width = 20;
    this.height = 20;

    this.draw = function(blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

var coeurFunctions = {
    "coeur": coeur
}
