function updateBulletP1(bulletP1) { 
     
     bulletP1.x += 5;
     
     if (bulletP1.x > 895) {
         bulletP1.kill();
     }

 }   
