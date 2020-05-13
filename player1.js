function updateP1(){      
    
    if (p1Shoot.isDown){
        shootP1();
    }
    
    if (p1Up.isDown){
        player1.y -= 2;
    } else if (p1Down.isDown){
        player1.y += 2;
    }
    
    if (p1Left.isDown){
        player1.x -= 2;
    } else if (p1Right.isDown){
        player1.x += 2;
    }
    
    if (player1.x > 880) { player1.x = 880; }
    
    if (player1.x < 80) { player1.x = 80; }
    
    if (player1.y > 450) { player1.y = 450; }
    
    if (player1.y < 90) { player1.y = 90; }
    
    //if (player is hit by bullet) {
        
        //p1Health -= 1;
        //healthPlayer1.frame += 1;
        
    //}
    
}

function shootP1(){
    
    var bulletP1; 
    
    var x = player1.x + 15;
    var y = player1.y - 23;
    
    if (game.time.now > p1cooldown) {
        
        bulletP1 = p1BulletsGroup.getFirstExists(false);
        
        if (bulletP1) {
            bulletP1.reset(x, y);
            p1cooldown = game.time.now + 400; 
        }
    }
    
}