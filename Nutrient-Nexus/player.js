let groundSensor; //used to detect overlap with ground, to fix the issue where the player can jump off the side of platforms and also the little delay between jumps if you hold space.

function createPlayer(){
  if (!player) {
    player = createSprite(width / 2, height / 2, 400, 400);
    player.image = (playerImage);
    player.scale = 0.1;
    player.velocity.x = 0;
    player.velocity.y = 0;
    player.bounciness = 0;
    player.layer = 999
    
    groundSensor = createSprite(player.x,player.y +10,34,40,'n')//inside the player hit box but smaller than it only poping out the bottom
    groundSensor.visible = false;
    groundSensor.mass = 0.01;
    
    let j = new GlueJoint(player, groundSensor);
	j.visible = false;
  }
}



// player movement AND colour
function movement() {
  let acceleration = 2;
  let maxSpeed = 10;
  let jumpStrength = -12;
  let gravity = 0.6;
  let friction = 0.95;
  
  // To prevent the player from spinning 
  player.rotation = 0;
 
    

  // Left and right movement 
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {  // A or Left Arrow
    player.velocity.x -= acceleration;
  } 
  
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {  // D or Right Arrow
    player.velocity.x += acceleration;
  }

  // Apply friction to make the movement feel smoother
  
  player.velocity.x *= friction;
  
  

  // Prevent the player from going too fast
  player.velocity.x = constrain(player.velocity.x, -maxSpeed, maxSpeed);
  
  // apply gravit y
  player.velocity.y += gravity
  
  
  // Check for jump input and handle jumps
  if ((keyIsDown(32) || keyIsDown(UP_ARROW)) && groundSensor.overlapping(ground)) {
    player.velocity.y = jumpStrength;
  }
 

  //kills player if they overlap obsitcals
  if (player.overlaps(kill)){
    thud.play();
    player.x = 100
    player.y=500
    score -= 100
    
    //flash when you die
    let flash;
    flash = createSprite(width/2,height/2,width,height);
    flash.color = 'white'
    flash.collider = 'n'
    
    setTimeout(() => {
    flash.remove();
  }, 300);
  }
  
  // player customisation if they beat a level
  if (complete1 === true && kb.presses('2') && gameState === 'lobby'){
      player.image = chef2
      
    }
  if (kb.presses('1') && gameState === 'lobby'){
    player.image = playerImage
  }
  if (kb.presses('3') && gameState === 'lobby' && complete2 === true){
    player.image = chef3
  }
  if (gameState === 'lobby'){
    // Draw the UI in the top-right corner
  push(); // Save current drawing state
  noStroke(); // Disable border
  fill(0, 0, 0, 200); // Black background with some transparency
  rect(width - 160, 10, 150, 100); // UI panel background

  fill(255); // White text
  textSize(24);
  text("Skins:", width - 150, 25);

  // Draw skin slots
  let slotSize = 30;
  let slotY = 40;

  // Slot 1 (Skin 1)
  fill(complete1 ? 'green' : 'red'); // Green if unlocked, Red if locked
  rect(width - 100, slotY, slotSize, slotSize);
  fill(255); // White text for slot number
  text("1", width - 130, slotY + 20);

  // Slot 2 (Default Skin)
  fill('green'); // Default skin is always available
  rect(width - 140, slotY, slotSize, slotSize);
  fill(255);
  text("2", width - 90, slotY + 20);

  // Slot 3 (Skin 3)
  fill(complete2 ? 'green' : 'red'); // Green if unlocked, Red if locked
  rect(width - 60, slotY, slotSize, slotSize);
  fill(255);
  text("3", width - 50, slotY + 20);

  // Highlight selected skin
  noFill();
  stroke('yellow');
  strokeWeight(2);
  if (player.image === chef2) {
      rect(width - 100, slotY, slotSize, slotSize); // Highlight slot 1
  } else if (player.image === playerImage) {
      rect(width - 140, slotY, slotSize, slotSize); // Highlight slot 2
  } else if (player.image === chef3) {
      rect(width - 60, slotY, slotSize, slotSize); // Highlight slot 3
  }
  pop(); // Restore drawing state
  }
  
}



//collection and spawing ingredienst 
// sushi x value, sushi y value ect...
function collection(Sx,SyMin,SyMax,Rx,RyMin,RyMax,Fx,FyMin,FyMax){
      if (generated === false ){ // genearted only checks if the ingertindts where mad einto the level 
      sushi = createSprite(random(width-Sx),random(height-SyMin,height-SyMax),800,1200);
      sushi.image =(sushiImage);
      sushi.scale = 0.1;
      sushi.collider = "n"; // No collision detection
    }
      if (generated === false ){
      rice = createSprite(random(width-Rx),random(height-RyMin,height-RyMax),800,800);
      rice.image =(riceImage);
      rice.scale = 0.1;
      rice.collider = "n";
      }
      
      if(generated === false ){
      fish = createSprite(random(width-Fx),random(height-FyMin,height-FyMax),800,800);
      fish.image =(fishImage);
      fish.scale = 0.1;
      fish.collider = "n"; // No collision detection
      }

    generated = true

//all of this is randomised for now but the ingredients will have a set location inside the level 
    // If the player overlaps with the sushi and presses 'E', collect it
   // If the player overlaps with the sushi and presses 'E', collect it
if (
  (kb.pressing("e") &&
  player.overlaps(sushi) &&
  collectedSushi < requiredSushi) ||
  (E ===false &&
  player.overlaps(sushi) &&
  collectedSushi < requiredSushi) 
) {
  collectedSushi++; // Increment sushi collected count
  sushi.remove(); // Remove the current sushi sprit
  calc_collect_score() //add score based on time

  // Respawn the sushi at a new random position
  sushi = createSprite(random(width-Sx),random(height-SyMin,height-SyMax),800,1200);
  sushi.image =(sushiImage);
  sushi.scale = 0.1;
  sushi.collider = "n";
  ding.play(0.2)
} else if (collectedSushi === requiredSushi){ //remove sprite if game state is lobby
  sushi.remove();
}

// If the player overlaps with the fish and presses 'E', collect it
if (
  (kb.pressing("e") &&
  player.overlaps(fish) &&
  collectedFish < requiredFish) ||
  (E === false &&
  player.overlaps(fish) &&
  collectedFish < requiredFish)
) {
  collectedFish++; // Increment fish collected count
  fish.remove();
  ding.play(0.2)// Remove the current fish sprite
  calc_collect_score() //add score based on time
  // Respawn the fish at a new random position
  fish = createSprite(random(width-Fx),random(height-FyMin,height-FyMax),800,800);
  fish.image =(fishImage);
  fish.scale = 0.1;
  fish.collider = "n";
}else if (collectedFish === requiredFish){
  fish.remove();
}

// If the player overlaps with the rice and presses 'E', collect it
if (
  (kb.pressing("e") &&
  player.overlaps(rice) &&
  collectedRice < requiredRice) ||
(E === false &&
  player.overlaps(rice) &&
  collectedRice < requiredRice) 
) {
  collectedRice++; // Increment rice collected count
  rice.remove(); // Remove the current rice sprite
  ding.play(0.2)
  calc_collect_score()//add score based on time
  // Respawn the rice at a new random position
  rice = createSprite(random(width-Rx),random(height-RyMin,height-RyMax),800,800);
  rice.image =(riceImage);
  rice.scale = 0.1;
  rice.collider = "n";
}else if (collectedRice === requiredRice){
  rice.remove();
}
}

