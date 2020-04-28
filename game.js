var width = 960;
var height = 540;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', 
                           {
                                preload: preload,
                                 create: create,
                                 update: update
                           });

var playing = false;

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

var player2;
var p2Up;
var p2Down;
var p2Left;
var p2Right;
var p2Shoot;

function preload(){
    
    game.load.image('backgroundMenu', 'assets/backgroundMenu.png');
    game.load.image('backgroundGame', 'assets/backgroundGame.png');
    game.load.image('buttonPlay', 'assets/buttonPlay.png');
    
    game.load.image('labelPlayer1', 'assets/labelPlayer1.png');
    game.load.image('labelPlayer2', 'assets/labelPlayer2.png');
    game.load.image('player1' , 'assets/playerTemplate.png');
    game.load.image('player2' , 'assets/playerTemplate.png');
    
    game.load.spritesheet('spritesheetHealth', 'assets/spritesheetHealth.png', 180, 60, 7);
      
}

function create(){
    
    backgroundMenu = game.add.sprite(0, 0, 'backgroundMenu');
    backgroundGame = game.add.sprite(0, 0, 'backgroundGame');
    backgroundMenu.visible = true;
    backgroundGame.visible = false;
    
    buttonPlay = game.add.button(width/2, height/2, 'buttonPlay');
    buttonPlay.anchor.setTo(0.5, 0.5);
    buttonPlay.onInputDown.add(play, this);
    
    labelPlayer1 = game.add.sprite(width/2 - 410, height/18, 'labelPlayer1');
    labelPlayer2 = game.add.sprite(width/2 + 410, height/18, 'labelPlayer2');
    labelPlayer1.visible = false;
    labelPlayer2.visible = false;
    labelPlayer1.anchor.setTo(0.5, 0.5);
    labelPlayer2.anchor.setTo(0.5, 0.5);
    
    healthPlayer1 = game.add.sprite(width/2 + 380, height/7, 'spritesheetHealth');
    healthPlayer1.anchor.setTo(0.5, 0.5);
    healthPlayer1.animations.add('healthAnimation', [0, 1, 2, 3, 4, 5, 6]);
    healthPlayer1.frame = 0;
    healthPlayer1.visible = false;
    
    healthPlayer2 = game.add.sprite(width/2 - 380, height/7, 'spritesheetHealth');
    healthPlayer2.anchor.setTo(0.5, 0.5);
    healthPlayer2.animations.add('healthAnimation', [0, 1, 2, 3, 4, 5, 6]);
    healthPlayer2.frame = 0;
    healthPlayer2.visible = false;
    
    player1 = game.add.sprite(width - 820, height/2, 'player1');
    player1.anchor.setTo(0.5, 0.5);
    player1.visible = false;
    p1Up = game.input.keyboard.addKey(Phaser.Keyboard.W);
    p1Down = game.input.keyboard.addKey(Phaser.Keyboard.S);
    p1Left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    p1Right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    p1Shoot = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    player2 = game.add.sprite(width - 140, height/2, 'player2');
    player2.anchor.setTo(0.5, 0.5);
    player2.visible = false;
    p2Up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    p2Down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    p2Left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    p2Right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    p2Shoot = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
}

function update(){
    
    if (playing){
        
        updateP1();
        
    }
    
}

function play(){
    
    playing = true;
    
    buttonPlay.visible = false;
    backgroundGame.visible = true;
    labelPlayer1.visible = true;
    labelPlayer2.visible = true;
    healthPlayer1.visible = true;
    healthPlayer2.visible = true;
    player1.visible = true;
    player2.visible = true;
    
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
    
}
