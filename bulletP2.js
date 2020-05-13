function updateBulletP2(bulletP2) {
     
     bulletP2.x -= 5;
     
     if (bulletP2.x < 65) {
         bulletP2.kill();
     }
    
     //if (bulletP2 collides with box) {
         //bulletP2.kill();
     //}
  
 }