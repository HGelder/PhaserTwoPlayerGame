function updateP2(){       
    
    if (p2Shoot.isDown){
        shootP2();
    }
    
    if (p2Up.isDown){
        player2.y -= 2;
    } else if (p2Down.isDown){
        player2.y += 2;
    }
    
    if (p2Left.isDown){
        player2.x -= 2;
    } else if (p2Right.isDown){
        player2.x += 2;
    }
    
    if (player2.x > 880) { player2.x = 880; }
    
    if (player2.x < 80) { player2.x = 80; }
    
    if (player2.y > 450) { player2.y = 450; }
    
    if (player2.y < 90) { player2.y = 90; }
    
}

function shootP2(){ 
    
    var bulletP2; 
    
    var x = player2.x - 15;
    var y = player2.y + 23;
    
    if (game.time.now > p2cooldown) {
        
        bulletP2 = p2BulletsGroup.getFirstExists(false);
        
        if (bulletP2) {
            bulletP2.reset(x, y);
            p2cooldown = game.time.now + 400; 
        }
    }
    
}