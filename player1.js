function updateP1(){
    
    if (p1Up.isDown){
        
        player1.y -= 2;
        
    } else if (p1Down.isDown){
        
        player1.y += 2;
        
    } else if (p1Left.isDown){
        
        player1.x -= 2;
        
    } else if (p1Right.isDown){
        
        player1.x += 2;
        
    }
    
}