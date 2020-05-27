function spawnBoxes(){     
     
    var allXPoints = [ 150, 210, 270, 330, 390, 450, 510, 570, 630, 690, 750, 810 ];
    var allYPoints = [ 150, 210, 270, 330, 390 ];
    
    for (var i = 0; i < 10; i++){
        
        var pointX = allXPoints[Math.floor(Math.random() * allXPoints.length)];
        var pointY = allYPoints[Math.floor(Math.random() * allYPoints.length)];
        
        if (pointX == 150 && pointY == 270 || pointX == 810 && pointY == 270) {
            // do nothing -> cannot place boxes in player's starting squares
        } else {  
            boxGroup.getFirstDead(true, pointX, pointY);
        }
    }
    
}