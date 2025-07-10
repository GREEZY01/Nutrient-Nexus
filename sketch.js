// IDEA move the location of the door, and have the player ave to go over it and click e to go back to the lobby anf then move it back to its original place

// Global variables
let find = []; // Store collected items

let player;
let ground;
let sushi;
let rice;
let fish;
let tick;

let platform;
let time;
let cookerImage;
let bgmusic;
let cooker;
let generated = false;
let kill;


// Required ingredients for level 1

// Game state
let gameState = "menu"; // "menu" for the main menu, "lobby" for the lobby and 'level#'' for the levels

// Sprite images
let sushiImage;
let fishImage;
let riceImage;
let tickImage;
let playerImage;
let levelDoor;
let chef2;
let chef3;
let border;
let ding;
let thud;
let serving;
//pre load all sprites
function preload() {
  bgmusic = createAudio("assets/ping-pong-swing-giulio-fazio-main-version-20430-02-55.mp4");
  ding = createAudio('assets/ding.mp3')
  thud = createAudio('assets/thud.wav')
  serving = createAudio('assets/serving.wav')
  
  serving.volume(1)
  thud.volume(1)
  bgmusic.volume(0.15)
  ding.volume(1);
  
  cookerImage = loadImage('assets/furnace.png')
  playerImage = loadImage("assets/Chef_emoji.png");
  sushiImage = loadImage("assets/sushi.png");
  fishImage = loadImage("assets/fish.png");
  riceImage = loadImage("assets/rice.png");
  
  levelDoor = loadImage("assets/door.png");
  backgroundImage = loadImage('assets/bg.jpg')
  bricksImage = loadImage('assets/bricks.png')
  chef2 = loadImage('assets/chef_two.png')
  chef3 = loadImage('assets/chef_three.png')

}
// Create sprites
function setup() {
  createCanvas(1200, 600,'fullScreen');
  strokeWeight(3);
  stroke(255,255,255);
  textFont('Tiny5')

  
  //cretae a group called ground
  ground = new Group();
  
  kill = new Group();
  
  // Initialize the find display
  textSize(24);
  fill(0);
  
// create  border so player doesnt fall off map
  border = new Sprite([[0, 600], [0, 0], [1200, 0],[1200,600]]);
  border.collider = 'static';
}

// Update the find display for required ingredients
function displayRequiredIngredients() {
  textSize(24);
  fill(0);
  let yOffset = 30; // Start y-position
  let xOffset = 60; // Move the ingredients display to the right (X position)

  // Display "Collect" label
  text("Collect: ", xOffset, yOffset);

  // Display each required ingredient at a fixed position
  yOffset += 30; // Move down for next ingredient
  text("Sushi: " + (requiredSushi - collectedSushi), xOffset, yOffset); // Show remaining sushi

  yOffset += 40; // Move down for next ingredient
  text("Fish: " + (requiredFish - collectedFish), xOffset, yOffset); // Show remaining fish

  yOffset += 40; // Move down for next ingredient
  text("Rice: " + (requiredRice - collectedRice), xOffset, yOffset); // Show remaining rice
}

// Main game loop
//-------------------------------------------
function draw() {
  
  
  if (gameState === "menu") {
    // Display menu
    background(backgroundImage);
    displayMenu();
  } else if (gameState === "lobby") {
    background(0);
    lobby();
    createPlayer();
    movement(ground);
    
    //level 1
  } else if (gameState === "level1") {
    background(bricksImage);
    // Create player sprite and ingredients only in the game state
    createPlayer();
    

    // Handle player movement
    movement(ground);
    level1();
   

    // create ingreitient collection system and spawn ingredeints
    //            sushi,       rice,       fish
    collection(200,60,500,  200,200,500,  200,100,500);

    // Display the required ingredients (with counts)
    displayRequiredIngredients();
    
    //level 2
  } else if(gameState=== 'level2'){
    background(bricksImage);
    // Create player sprite and ingredients only in the game state
    createPlayer();
    
    // Handle player movement
    movement(ground);
    level2();
    
    // create ingreitient collection system and spawn ingredeints
    //            sushi,       rice,       fish
    collection(200,60,500,  200,50,500,  200,50,500);
    // Display the required ingredients (with counts)
    displayRequiredIngredients();

  }else if(gameState=== 'level3'){
    background(bricksImage);
    // Create player sprite and ingredients only in the game state
    createPlayer();
    
    // Handle player movement
    movement(ground);
    level3();

    // create ingreitient collection system and spawn ingredeints
    //            sushi,       rice,       fish
    collection(200,60,500,  200,50,500,  200,50,500);
    // Display the required ingredients (with counts)
    displayRequiredIngredients(); 
  } else if (gameState === 'endscreen'){
    endscreen()
  }

}
let showRules = false; // Tracks whether the rules are being displayed
let Etoggle 
let E = false
let Ecount = 1
function displayMenu() {
  if (frameCount ===1 ){
   
    Etoggle = new Sprite(1100,540,100,50)
  } else{
    Etoggle.color = 'red'  
    if(Etoggle.mouse.presses() && Etoggle.mouse.hovering()){
      Ecount +=1
    }
    if (Ecount %2===0){
      Etoggle.color = 'green'
      E = true
    }
  }
  
  
  
  fill(0);
  textSize(58);
  textAlign(CENTER, CENTER);
  text("Welcome to Nutrient Nexus!", width / 2, height / 3);

  textSize(32);
  text("Press ENTER to Start", width / 2, height / 2.3);

  // Rules/Controls button
  textSize(24);
  fill(255, 0, 0);
  text("Rules/Controls", width / 2, height / 1.8);

  // Check for mouse click on Rules/Controls button
  if (mouseIsPressed && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 1.8 - 20 && mouseY < height / 1.8 + 20) {
    showRules = !showRules; // Toggle rules display
  }

  // Display the rules if toggled
  if (showRules) {
    displayRules();
  }

  // Start the game when ENTER is pressed
  if (keyIsDown(ENTER) && !showRules) { // Only start if rules are not displayed
    fill(0); // Reset text color to black
    bgmusic.volume = 0;
    bgmusic.play(); // play music
    bgmusic.loop(); // loop music 
    Etoggle.remove()
    gameState = "lobby"; // Switch to game state
  }
}

function displayRules() {
  fill(200);
  rect(width / 4, height / 4, width / 2, height / 2); // Background for rules

  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  let rulesText = "Rules:\n1. Collect nutrients to score points.\n2. Avoid obstacles to keep your score and answer questions.\n3. Beat the level by collecting enough score.\n\nControls:\n- Arrow Keys/ A and D and Space Bar: Move\n- E (hold) to collect nutrients and enter doors \n(only if toggled on, applies only for ingredients) \n- After you beat each level you can change your character colour \n   1 is the orignal chef, 2 is for when you beat the 1st level ect...";
  text(rulesText, width / 4 + 20, height / 4 + 20);

  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(16);
  

  // Check for mouse click on "Click here to close"
  if (mouseIsPressed && mouseX > width / 4 && mouseX < width / 4 + width / 2 && mouseY > height / 4 && mouseY < height / 4 + height / 2) {
    showRules = false; // Close rules display
  }
}

// calculates and adds the score based on time
function calc_collect_score(){
  if ((frameCount-start)/60 < 5){
    score += 150
  } else if ((frameCount-start)/60 < 10){
    score +=100
  } else if ((frameCount-start)/60 < 20){
    score += 75
  } else if ((frameCount-start)/60 > 20){
    score +=75
  }

}
let confetti = []; // Array to store confetti objects

function endscreen() {
  // Remove game elements
  ground.remove();
  player.remove();
  level_doors.remove();

  // Set a slower flashing interval
  let flashSpeed = 30; // Adjust this value to control the flashing speed (higher = slower)

  if (totalScore >= 6700) {
 
    if (frameCount % flashSpeed === 0) {
      background(random(255), random(255), random(255)); // Change color every flashSpeed frames
    }
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Congratulations! You Completed the Game!", width / 2, height / 3);
    textSize(24);
    text(`Total Time: ${totalTime}`, width / 2, height / 2);
    text(`Final Score: ${totalScore}`, width / 2, height / 2 + 40);

    // Generate confetti
    if (confetti.length < 100) {
      confetti.push(new Confetti(random(width), 0, random(10, 20), random(10, 20)));
    }

    
    for (let c of confetti) {
      c.update();
      c.show();
    }
  } else {
  
    background(50); 
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over! You Didn't Score Enough.", width / 2, height / 3);
    textSize(24);
    text(`Total Time: ${totalTime}`, width / 2, height / 2);
    text(`Final Score: ${totalScore}`, width / 2, height / 2 + 40);
  }

  // Restart button
  let restartButton = createButton('Restart Game');
  restartButton.scale = 2
  restartButton.position(1100 , 700);
  restartButton.mousePressed(() => location.reload());
}

// Confetti class
class Confetti {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color(random(255), random(255), random(255));
    this.ySpeed = random(2, 5);
    this.xSpeed = random(-2, 2);
  }

  update() {
    this.y += this.ySpeed;
    this.x += this.xSpeed;
    if (this.y > height) {
      this.y = 0; // Reset position if confetti falls off screen
      this.x = random(width);
    }
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.w, this.h); // Draw confetti as small circles
  }
}
