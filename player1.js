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
    
    // stops player from passing through the outer walls
    if (player1.x > 880) { player1.x = 880; }
    
    if (player1.x < 80) { player1.x = 80; }
    
    if (player1.y > 450) { player1.y = 450; }
    
    if (player1.y < 90) { player1.y = 90; }
    
}

function shootP1(){
    // do stuff
}