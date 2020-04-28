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

function preload(){
    
    game.load.image('backgroundMenu', 'assets/backgroundMenu.png');
    game.load.image('backgroundGame', 'assets/backgroundGame.png');
    game.load.image('buttonPlay', 'assets/buttonPlay.png');
    
    game.load.image('labelPlayer1', 'assets/labelPlayer1.png');
    game.load.image('labelPlayer2', 'assets/labelPlayer2.png');
      
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
    
}

function update(){
    
    if (playing){
        // do stuff
    }
    
}

function play(){
    
    playing = true;
    
    buttonPlay.visible = false;
    backgroundGame.visible = true;
    labelPlayer1.visible = true;
    labelPlayer2.visible = true;
    
}

function exit(){
    
    playing = false;
    
    buttonPlay.visible = true;
    backgroundGame.visible = false;
    labelPlayer1.visible = false;
    labelPlayer2.visible = false;
    
}
