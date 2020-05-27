var WIDTH = 960;        
var HEIGHT = 540;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, '', 
                           {
                                preload: preload,
                                 create: create,
                                 update: update
                           });

var playing = false;
var winner = "";
var p1win;
var p2win;
var boxGroup;

var backgroundMenu;
var backgroundGame;
var buttonPlay;
var labelPlayer1;
var labelPlayer2;
var healthPlayer1;
var healthPlayer2;

var player1;
var p1Up;
var p1Down;
var p1Left;
var p1Right;
var p1Shoot;
var p1BulletsGroup; 
var p1Health = 0; 
var p1cooldown = 0;

var player2;
var p2Up;
var p2Down;
var p2Left;
var p2Right;
var p2Shoot;
var p2BulletsGroup;
var p2Health = 0; 
var p2cooldown = 0;

function preload(){
    
    game.load.image('backgroundMenu', 'assets/backgroundMenu.png');
    game.load.image('backgroundGame', 'assets/backgroundGame.png');
    game.load.image('buttonPlay', 'assets/buttonPlay.png');
    
    game.load.image('labelPlayer1', 'assets/labelPlayer1.png');
    game.load.image('labelPlayer2', 'assets/labelPlayer2.png');
    game.load.image('player1' , 'assets/player1.png');
    game.load.image('player2' , 'assets/player2.png');
    
    game.load.image('bulletP1', 'assets/bulletPlayer1.png');
    game.load.image('bulletP2', 'assets/bulletPlayer2.png');
    game.load.image('box' , 'assets/metalBox.png');
    
    game.load.image('p1win', 'assets/player1win.png');
    game.load.image('p2win', 'assets/player2win.png');
    
    game.load.spritesheet('spritesheetHealth', 'assets/spritesheetHealth.png', 180, 60, 7);
      
}

function create(){
    
    backgroundMenu = game.add.sprite(0, 0, 'backgroundMenu');
    backgroundGame = game.add.sprite(0, 0, 'backgroundGame');
    backgroundMenu.visible = true;
    backgroundGame.visible = false;
    
    buttonPlay = game.add.button(WIDTH/2, HEIGHT/2, 'buttonPlay');
    buttonPlay.anchor.setTo(0.5, 0.5);
    buttonPlay.onInputDown.add(play, this);
    
    labelPlayer1 = game.add.sprite(WIDTH/2 - 410, HEIGHT/18, 'labelPlayer1');
    labelPlayer2 = game.add.sprite(WIDTH/2 + 410, HEIGHT/18, 'labelPlayer2');
    labelPlayer1.anchor.setTo(0.5, 0.5);
    labelPlayer2.anchor.setTo(0.5, 0.5);
    labelPlayer1.visible = false;
    labelPlayer2.visible = false;
    
    p1win = game.add.sprite(WIDTH/2, HEIGHT/2 - 125, 'p1win');
    p2win = game.add.sprite(WIDTH/2, HEIGHT/2 - 125, 'p2win');
    p1win.anchor.setTo(0.5, 0.5);
    p2win.anchor.setTo(0.5, 0.5);
    p1win.visible = false;
    p2win.visible = false;
    
    healthPlayer1 = game.add.sprite(WIDTH/2 - 380, HEIGHT/7, 'spritesheetHealth');
    healthPlayer1.anchor.setTo(0.5, 0.5);
    healthPlayer1.animations.add('healthAnimation', [0, 1, 2, 3, 4, 5, 6]);
    healthPlayer1.frame = 0;
    healthPlayer1.visible = false;
    
    healthPlayer2 = game.add.sprite(WIDTH/2 + 380, HEIGHT/7, 'spritesheetHealth');
    healthPlayer2.anchor.setTo(0.5, 0.5);
    healthPlayer2.animations.add('healthAnimation', [0, 1, 2, 3, 4, 5, 6]);
    healthPlayer2.frame = 0;
    healthPlayer2.visible = false;
    
    player1 = game.add.sprite(WIDTH - 820, HEIGHT/2, 'player1');
    player1.anchor.setTo(0.5, 0.5);
    player1.visible = false;
    p1Up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    p1Down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    p1Left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    p1Right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    p1Shoot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    player2 = game.add.sprite(WIDTH - 140, HEIGHT/2, 'player2');
    player2.anchor.setTo(0.5, 0.5);
    player2.visible = false;
    p2Up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    p2Down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    p2Left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    p2Right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    p2Shoot = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
    p1BulletsGroup = game.add.group(); 
    p1BulletsGroup.createMultiple(10, 'bulletP1');
    p1BulletsGroup.forEach(function(bulletP1){bulletP1.anchor.setTo(0.5, 0.5)}, this);
    
    p2BulletsGroup = game.add.group();
    p2BulletsGroup.createMultiple(10, 'bulletP2');
    p2BulletsGroup.forEach(function(bulletP2){bulletP2.anchor.setTo(0.5, 0.5)}, this);
    
    boxGroup = game.add.group();
    boxGroup.createMultiple(10, 'box');
    boxGroup.forEach(function(box){box.anchor.setTo(0.5, 0.5)}, this);
    
}

function update(){
    
    if (playing){
        
        updateP1();
        updateP2();
        
        p1BulletsGroup.forEachAlive(updateBulletP1, this);
        p1BulletsGroup.forEachAlive(hitCheck, this, player2);
        p2BulletsGroup.forEachAlive(updateBulletP2, this);
        p2BulletsGroup.forEachAlive(hitCheck, this, player1);
        
        for (var i = 0; i < boxGroup.length; i++) {
            p1BulletsGroup.forEachAlive(hitCheck, this, boxGroup[i]);
            p2BulletsGroup.forEachAlive(hitCheck, this, boxGroup[i]);
        }
        
        if (p1Health == 0) {
            winner = "player 2";
            player1.kill();
            player2.kill();
            exit();
            
        } else if (p2Health == 0) {
            winner = "player 1";
            player1.kill();
            player2.kill();
            exit();
        }  
    }
    
}

function hitCheck(sprite1, sprite2) { // NEW
    
    var hit = false;
    
    if (sprite1.x < sprite2.x + sprite2.width &&
        sprite1.y < sprite2.y + sprite2.height && 
        sprite1.x + sprite2.width > sprite2.x &&
        sprite1.y + sprite2.height > sprite2.y) {
        
        hit = true;
        console.log("Collision!");
        
        if (sprite1.key === 'bulletP1' && sprite2.key === 'player2') {
            p2Health -= 1;
            healthPlayer2.frame += 1;
            sprite1.kill();
            
        } else if (sprite1.key === 'bulletP2' && sprite2.key === 'player1') {
            p1Health -= 1;
            healthPlayer1.frame += 1;
            sprite1.kill();
            
        } else {
            sprite1.kill();
        }
    
    }
    
    return hit;
}

function play(){
    
    playing = true;
    winner = "";
    
    buttonPlay.visible = false;
    backgroundGame.visible = true;
    labelPlayer1.visible = true;
    labelPlayer2.visible = true;
    healthPlayer1.visible = true;
    healthPlayer2.visible = true;
    player1.visible = true;
    player2.visible = true;
    p1win.visible = false;
    p2win.visible = false;
    healthPlayer1.frame = 0;
    healthPlayer2.frame = 0;
    p1Health = 6; 
    p2Health = 6; 
    
    spawnBoxes();
    
}

function exit(){
    
    playing = false;
    
    buttonPlay.visible = true;
    backgroundGame.visible = false;
    labelPlayer1.visible = false;
    labelPlayer2.visible = false;
    healthPlayer1.visible = false;
    healthPlayer2.visible = false;
    player1.visible = false;
    player2.visible = false;
    p1Health = 0; 
    p2Health = 0; 
    
    p1BulletsGroup.forEachExists(function(bullet){bullet.kill();}, this);
    p2BulletsGroup.forEachExists(function(bullet){bullet.kill();}, this);
    boxGroup.forEach(function(box){box.kill();}, this);
    
    if (winner === "player 1") {
        console.log("Player 1 wins!");
        p1win.visible = true;
    } else if (winner === "player 2") {
        console.log("Player 2 wins!");
        p2win.visible = true;
    }
       
}