let plat;
let level_doors;

let complete1 = false;// check if level 1 is complete 
let complete2 = false;//check if level 2 is complete 
let complete3 = false; //check if level 3 is complete
let score = 0; 
let cooked = false; // checks if food is cooked
let bento; 
let customer;
let spawned = false; // used to check if sprites are spawned in 
let start;
let end;
let served = false;//checks if food is served
let served1 =false
let served2=false 
let served3 = false
let loadLevel; // checing if platfomrs are loaded
let customer2;
let customer3 ;
let totalScore = 0;
let totalTime = 0;

function lobby() {
  loadLevel = false;

  cooked = false;
  served = false;
  textSize(24);

  if (complete1 === false) {
    text(" level 1: \n 1900 score needed to pass", width / 4, height - 220);
    textSize(34);
    text("COMPLETE LEVEL 1", width / 2, height / 3);
  } else if (complete2 === false) {
    text("COMPLETE LEVEL 2", width / 2, height / 3);
  } else if (complete3 === false){
    text("COMPLETE LEVEL 1", width / 2, height / 3);
  }

  // Make floor
  while (spawned === false) {
    for (let i = 0; i < Math.ceil(width / 80); i++) {
      let platform = createSprite(i * 80 + 40, height - 20, 80, 40);
      platform.collider = "s"; // Static ground

      // Kitchen floor feel
      if (i % 2 === 0) {
        platform.color = "white";
      } else {
        platform.color = "black";
      }
      ground.add(platform);
      push();
    }
    spawned = true;
    // i can add more deco here
    
  }

  // Doors
  if (!level_doors) {
    level_doors = createSprite(width / 4, height - 113, 350, 600);
    level_doors.image = levelDoor;
    level_doors.collider = "n";
    level_doors.scale = 0.3;

    if (complete1 === true && kb.presses("2")) {
      player.image = "chef_two";
    }
  }

  // Start level one
  if (
    (kb.pressing("e"))  && player.overlaps(level_doors) && complete1 === false) {
    gameState = "level1";
    level_doors.x -= 200;

    // Requirements for level 1
    requiredSushi = 3;
    requiredFish = 1;
    requiredRice = 1;
    collectedSushi = 0;
    collectedFish = 0;
    collectedRice = 0;
    spawned = false;
    generated = false;
  } else if (
    kb.pressing("e") &&
    player.overlaps(level_doors) &&
    complete1 === true && complete2 === false
  ) {
    gameState = "level2";
    level_doors.x -= 200;

    // Requirements for level 2
    requiredSushi = 3;
    requiredFish = 3;
    requiredRice = 3;
    collectedSushi = 0;
    collectedFish = 0;
    collectedRice = 0;
    spawned = false;
    generated = false;
  } else if (kb.pressing("e") &&
    player.overlaps(level_doors) &&
    complete2 === true){
   // Requirements for level 3
    gameState = "level3";
    level_doors.x -= 200;
    requiredSushi = 3;
    requiredFish = 3;
    requiredRice = 3;
    collectedSushi = 0;
    collectedFish = 0;
    collectedRice = 0;
    spawned = false;
    generated = false;
  }
  if (complete3 === true && complete2 === true && complete1 === true){
    gameState = 'endscreen'
  }



}

function level1() {
  text("score:" + score, 1100, 50);
  text('time:'+ round((frameCount-start)/60,1),1100,75)
  
  // Add customer counter
  let customersToServe = 1 - (served ? 1 : 0);
  text("customers left: " + customersToServe, 1100, 100);

  // make platforms
  if (loadLevel === false){
    createPlat(560,500)
    createPlat(640,500)
    createPlat(480,480)
    createPlat(480,500)
    
    createPlat(300,380)
    createPlat(220,380)
    createPlat(140,380)
    createPlat(60,380)
    createPlat(-20,380)
    createPlat(-20,420)
    createPlat(-20,460)
    createPlat(-20,500)
    createPlat(-20,540)
    
    createPlat(300,200)
    createPlat(220,200)
    
    createPlat(520,290)
    createPlat(600,290)
    createPlat(680,290)
    createPlat(680,250)
    
    createPlat(520,120)
    createPlat(600,100)
    
    createPlat(880,200)
    createPlat(960,200)
    createPlat(1040,200)
    createPlat(1040,160)
    createPlat(1040,240)
    createPlat(1120,200)
    
    createPlat(840,340)
    createPlat(840,300)
    createPlat(920,340)
    
    
    loadLevel = true; 
  }
  
  
  //cretae customer
  if (spawned === false) {
    customer = new Sprite(width / 5, height - 280);
    customer.image =("assets/fatguy.png");
    customer.scale = 3;
    customer.collider = "n";
    player.overlaps(customer)
    
    start = frameCount;
  }
  text('customer',customer.x - 70,customer.y - 23)
  
  //creates cooker
  if (spawned === false) {
    cooker = createSprite();
    cooker.h = 70;
    cooker.w = 48;
    cooker.collider = "s";
    cooker.image = cookerImage
    cooker.scale = 2
    cooker.x = width * 0.9;
    cooker.y = height - 140;
  }

  //if pkayer collected all ingredints ask questions
  if (
    collectedSushi === requiredSushi &&
    collectedFish === requiredFish &&
    collectedRice === requiredRice &&
    cooked === false
  ) {
    text("GO TO COOKER!!", player.x, player.y - 40);
  }
  if (
    collectedSushi === requiredSushi &&
    collectedFish === requiredFish &&
    collectedRice === requiredRice &&
    player.overlaps(cooker) &&
    cooked === false
  ) {
    for (let i = 0; i < 6; i += 1) {
      questions();
    }
    cooked = true;
  }


  // add sprite to player to make him look like es holding a bento box
  if (cooked === true && served === false) {
    if (!bento) {
      bento = new Sprite();
      bento.image =("assets/bentobox.png");
      bento.scale = 0.08;

      bento.collider = "n";
    }
    bento.x = player.x + 30;
    bento.y = player.y;
    text("SERVE THE FOOD!!", player.x, player.y - 40);
  }
  //if player goes to custmer add score
  if (player.overlaps(customer) && cooked === true && served === false) {
    serving.play()
    score += 1000;
    served = true;
  }
  //
  if (served === true) {
    bento.remove();
    text("FIND THE DOOR AND LEAVE!!", player.x, player.y - 40);
  }
  spawned = true
  
  if (player.overlaps(level_doors) && served === true ) {
    end = frameCount;
    // calcaulte the time taken and disply it with the score
    window.alert(
      "YOU COMPLETED LEVEL 1 with a score of " +
        score +
        " and a time of " +
        round((end - start) / 60, 3) +
        " seconds"
    );
    totalTime += round((end - start) / 60, 3)
    customer.remove();
    cooker.remove();
    level_doors.x += 200;
    served = false;
    cooked = false;
    complete1 = true;
    bento = null


    spawned = false;
    ground.removeAll();
    gameState = "lobby"; // dont foget to remocve all sprites
    totalScore += score
    score = 0 
  } 
  
}

  
function level2(){
  text("score:" + score, 1100, 50);
  text('time:'+ round((frameCount-start)/60,1),1100,75)
    text("score:" + score, 1100, 50);
  text('time:'+ round((frameCount-start)/60,1),1100,75)
  player.rotation = 0
  
  // Add customer counter
  let customersToServe = 1 - (served ? 1 : 0);
  text("customers left: " + customersToServe, 1100, 100);
  
  // make platforms
  if (loadLevel === false){
   
    createPlat(220,200)
    createPlat(140,200)
  
    createPlat(220,380)
    createPlat(140,380)
    createPlat(60,380)
    createPlat(-20,380)
    createPlat(-20,420)
    createPlat(-20,460)
    createPlat(-20,500)
    createPlat(-20,540)
    
    createPlat(980,340)
    createPlat(1060,340)
    createPlat(1140,340)
    createPlat(1220,340)
    createPlat(1220,380)    
    createPlat(1220,420)
    createPlat(1220,460)
    createPlat(1220,500)
    createPlat(1220,540)
    
    
    //creates the middle collum
    for (let i = 0; i<11;i++){
      if ( i != 4 && i != 5 ){
        createPlat(width/2,height -(40*i) - 60)}
      if(i%3 === 0 && i != 6){
        createPlat(width/2-80,height -(40*i) - 60)
        createPlat(width/2+80,height -(40*i) - 60)
        if (i<8){
          createPlat(width/2-160,height -(40*i) - 60)
          createPlat(width/2+160,height -(40*i) - 60)
        }  
        
        
      }
      if (i===6){
          createPlat(width/2-130,height -(40*i) - 60)
          createPlat(width/2+130,height -(40*i) - 60)
          createPlat(width/2-50,height -(40*i) - 60)
          createPlat(width/2+50,height -(40*i) - 60)
        }
    createLava(width/2,height -(11*40) -60)
    createPlat(width/2+240,540)
    createPlat(width/2-240,540)
    }   
  
    
    loadLevel = true; 
  }
  
  
  //cretae customer
  if (spawned === false) {
    customer = new Sprite(width / 5.5, height - 280);
    customer.image =("assets/fatguy.png");
    customer.scale = 3;
    customer.collider = "n";
    player.overlaps(customer)
    
    start = frameCount;
  }
  text('customer',customer.x - 70,customer.y - 23)
  
  //creates cooker
  if (spawned === false) {
    cooker = createSprite();
    cooker.h = 70;
    cooker.w = 48;
    cooker.collider = "s";
    cooker.image = cookerImage
    cooker.scale = 2
    cooker.x = width * 0.9;
    cooker.y = height - 140;
  }

  //if pkayer collected all ingredints ask questions
  if (
    collectedSushi === requiredSushi &&
    collectedFish === requiredFish &&
    collectedRice === requiredRice &&
    cooked === false
  ) {
    text("GO TO COOKER!!", player.x, player.y - 40);
  }
  if (
    collectedSushi === requiredSushi &&
    collectedFish === requiredFish &&
    collectedRice === requiredRice &&
    player.overlaps(cooker) &&
    cooked === false
  ) {
    for (let i = 0; i < 6; i += 1) {
      questions();
    }
    cooked = true;
  }


  // add sprite to player to make him look like es holding a bento box
  if (cooked === true && served === false) {
    if (!bento) {
      bento = new Sprite();
      bento.image =("assets/bentobox.png");
      bento.scale = 0.08;

      bento.collider = "n";
    }
    bento.x = player.x + 30;
    bento.y = player.y;
    text("SERVE THE FOOD!!", player.x, player.y - 40);
  }
  //if player goes to custmer add score
  if (player.overlaps(customer) && cooked === true && served === false) {
    serving.play()
    score += 1000;
    served = true;
  }
  //
  if (served === true) {
    bento.remove();
    text("FIND THE DOOR AND LEAVE!!", player.x, player.y - 40);
  }
  spawned = true
  
  if (player.overlaps(level_doors) && served === true ) {
    end = frameCount;
    // calcaulte the time taken and disply it with the score
    window.alert(
      "YOU COMPLETED LEVEL 2 with a score of " +
        score +
        " and a time of " +
        round((end - start) / 60, 3) +
        " seconds"
    );
    totalTime += round((end - start) / 60, 3)
    customer.remove();
    cooker.remove();
    level_doors.x += 200;
    served = false;
    cooked = false;
    complete2 = true;
    bento = null
  


    spawned = false;
    ground.removeAll();
    kill.removeAll();
    totalScore += score
    score = 0
    gameState = "lobby"; // dont foget to remocve all sprites
  } 
  
}  
  
function level3() {
  text("score:" + score, 1100, 50);
  text("time:" + round((frameCount - start) / 60, 1), 1100, 75);

  // Add customer counter
  let customersToServe = 3 - (served1 + served2 + served3);
  text("customers left: " + customersToServe, 1100, 100);

  player.rotation = 0;

  // Make platforms
  if (loadLevel === false) {
    createPlat(220, 380);
    createPlat(140, 380);
    createPlat(60, 380);
    createPlat(-20, 380);
    createPlat(-20, 420);
    createPlat(-20, 460);
    createPlat(-20, 500);
    createPlat(-20, 540);

    createPlat(440, 540);
    createPlat(440, 500);
    createPlat(440, 460);
    createPlat(520, 460);
    createPlat(600, 460);
    createPlat(680, 460);
    createPlat(760, 460);

    createPlat(600, 420);
    createPlat(600, 380);
    createPlat(360, 460);

    createPlat(600, 340);
    createPlat(520, 340);
    createLava(444, 339);

    createPlat(440, 300);
    createPlat(440, 260);

    createLava(175, 245);
    createPlat(100, 245);

    createPlat(440, 140);
    createPlat(360, 140);
    createPlat(360, 100);
    createPlat(360, 60);
    createPlat(360, 20);
    createPlat(280, 140);

    createPlat(1000, 350);
    createPlat(1080, 350);
    createPlat(1160, 350);

    createPlat(1000, 220);
    createPlat(920, 220);
    createPlat(840, 220);
    createPlat(760, 220);
    createPlat(680, 220);
    createPlat(680, 180);
    createPlat(680, 140);
    createPlat(600, 140);
    createPlat(520, 140);

    loadLevel = true;
  }

  // Create customer
  if (spawned === false) {
    customer = new Sprite(width / 5.5, height - 280);
    customer.image = "assets/fatguy.png";
    customer.scale = 3;
    customer.collider = "n";

    customer2 = new Sprite(450, 80);
    customer2.image = "assets/fatguy.png";
    customer2.scale = 3;
    customer2.collider = "n";

    customer3 = new Sprite(700, 400);
    customer3.image = "assets/fatguy.png";
    customer3.scale = 3;
    customer3.collider = "n";

    start = frameCount;
  }
  text("customer", customer.x - 70, customer.y - 23);

  // Create cooker
  if (spawned === false) {
    cooker = createSprite();
    cooker.h = 70;
    cooker.w = 48;
    cooker.collider = "s";
    cooker.image = cookerImage;
    cooker.scale = 2;
    cooker.x = width * 0.9;
    cooker.y = height - 140;
  }

  // If player collected all ingredients, ask questions
  if (
    collectedSushi === requiredSushi &&
    collectedFish === requiredFish &&
    collectedRice === requiredRice &&
    cooked === false
  ) {
    text("GO TO COOKER!!", player.x, player.y - 40);
  }

  if (
    collectedSushi === requiredSushi &&
    collectedFish === requiredFish &&
    collectedRice === requiredRice &&
    player.overlaps(cooker) &&
    cooked === false
  ) {
    for (let i = 0; i < 6; i += 1) {
      questions();
    }
    cooked = true;
  }

  // Add sprite to player to make it look like they are holding a bento box
  if (cooked === true && served === false) {
    if (!bento) {
      bento = new Sprite();
      bento.image = "assets/bentobox.png";
      bento.scale = 0.08;

      bento.collider = "n";
    }
    bento.x = player.x + 30;
    bento.y = player.y;
    text("SERVE THE FOOD (all 3)!!", player.x, player.y - 40);
  }

  // If player goes to customer, add score
  if (player.overlaps(customer) && cooked === true && served1 === false) {
    serving.play()
    score += 500;
    served1 = true;
  }
  if (player.overlaps(customer2) && cooked === true && served2 === false) {
    serving.play()
    score += 500;
    served2 = true;
  }
  if (player.overlaps(customer3) && cooked === true && served3 === false) {
    serving.play()
    score += 500;
    served3 = true;
  }
  if (served1 === true && served2 === true && served3 === true) {
    served = true;
  }

  // If served, display message to find the door
  if (served === true) {
    bento.remove();
    text("FIND THE DOOR AND LEAVE!!", player.x, player.y - 40);
  }
  spawned = true;

  // Check if player overlaps with level doors
  if (player.overlaps(level_doors) && served === true ) {
    end = frameCount;
    // Calculate the time taken and display it with the score
    window.alert(
      "YOU COMPLETED LEVEL 3 with a score of " +
        score +
        " and a time of " +
        round((end - start) / 60, 3) +
        " seconds"
    );
    totalTime += round((end - start) / 60, 3)
    customer.remove();
    cooker.remove();
    customer2.remove();
    customer3.remove()
    level_doors.x += 200;
    served = false;
    cooked = false;
    complete3 = true;
    bento = null


    spawned = false;
    ground.removeAll();
    kill.removeAll();

    gameState = "lobby"; // Don't forget to remove all sprites
    totalScore += score
    score = 0
  } 
}


function questions() {
  let question = [
    "Which food helps build strong muscles?", // Question 1
    "What is a healthy snack to keep you full?", // Question 2
    "Which vitamin do you get from the Sun?", // Question 3
    "What kind of fat is good for your heart?", // Question 4
    "Which fruit is very healthy and colorful?", // Question 5
    "What type of bread is better for your body?", // Question 6
    "Which drink helps make your bones strong?", // Question 7
    "Why are green vegetables good for you?", // Question 8
    "Which food gives you quick energy?", // Question 9
    "What is a tasty and healthy snack?", // Question 10
    "What drink is the most healthy when you are thirsty?", // Question 11
    "How many glasses of water should you drink a day?", // Question 12
    "Which of these is a vegetable?", // Question 13
    "What is a healthy alternative to cola?", // Question 14
    "Which fruit has a lot of vitamin C?", // Question 15
    "Why are nuts good for your body?", // Question 16
    "Which is bread is the healthiest?", // Question 17
    "What is a healthy way to cook vegetables?", // Question 18
    "What food has good bacteria for your tummy?", // Question 19
    "What is a healthy way to cook chicken?", // Question 20
    "Which fish has good fats for your brain?", // Question 21
    "Which vegetable helps you get strong?", // Question 22
    "Why is it good to eat many colors of fruits and vegetables?", // Question 23
    "What should you look for on a food label to avoid too much sugar?", // Question 24
    "When is a good time to eat breakfast?", // Question 25
    "What drink can make you feel calm and healthy?", // Question 26
    "What food helps keep your tummy healthy?", // Question 27
    "What can you eat instead of candy for sweetness?", // Question 28
    "Which vitamin is good for your eyes?", // Question 29
    "Why do we have to eat?", // Question 30
    "What should be the biggest part of your meal?", // Question 31
  ];

  let choices = [
    "a) Candy     b) Chicken     c) Chips     d) Ice cream", // Question 1
    "a) Cookies     b) Apples     c) Soda     d) Popcorn", // Question 2
    "a) Vitamin A     b) Vitamin D     c) Vitamin C     d) Vitamin E", // Question 3
    "a) Butter     b) Fish oil     c) Olive oil     d) Fried oil", // Question 4
    "a) Tomato     b) Blueberries     c) Onions     d) Cake", // Question 5
    "a) White bread     b) Whole grain bread     c) Cake     d) Croissant", // Question 6
    "a) Soda     b) Milk     c) Juice     d) Water", // Question 7
    "a) They taste good     b) They give you vitamins     c) They are fun to eat     d) They are soft", // Question 8
    "a) Chocolate     b) Rice     c) Soda     d) Fruit", // Question 9
    "a) Nuts     b) chocolate cake     c) Cookies     d) Candy", // Question 10
    "a) Juice     b) milk     c) Soda     d) water", // Question 11
    "a) 2 glasses     b) 5 glasses     c) 8 glasses     d) 10 glasses", // Question 12
    "a) Ice cream     b) cheese     c) broccoli     d) Cake", // Question 13
    "a) Juice     b) water     c) energy drink     d) cookie Milkshake", // Question 14
    "a) Oranges     b) Apples     c) Bananas     d) Grapes", // Question 15
    "a) They give you energy     b) They are bad for you     c) They have healthy fats     d) They make you sleepy", // Question 16
    "a) White bread     b) cornbread     c) Brioche     d) Whole grain bread", // Question 17
    "a) Frying     b) Steaming     c) Baking     d) Microwaving", // Question 18
    "a) Bread     b) Yogurt     c) Ice cream     d) Candy", // Question 19
    "a) Grilling     b) frying     c) Deep frying     d) Boiling", // Question 20
    "a) Salmon     b) candy     c) Chips     d) Cake", // Question 21
    "a) Potatoes     b) Spinach     c) Chips     d) Bread", // Question 22
    "a) They look pretty     b) fun to eat     c) They have different vitamins     d) They are soft", // Question 23
    "a) Calories     b) Protein     c) Sugar     d) Vitamins", // Question 24
    "a) Before bed     b) After school     c) night time     d) In the morning ", // Question 25
    "a) Soda     b) Green tea     c) Juice     d) Milkshake", // Question 26
    "a) Candy     b) Yogurt     c) Ice cream     d) Soda", // Question 27
    "a) Honey     b) steak     c) Chocolate     d) Butter", // Question 28
    "a) Vitamin D     b) Vitamin A     c) Vitamin B     d) Vitamin C", // Question 29
    "a) Energy     b) It's tasty     c) It gives us superpowers     d) To make us weak", // Question 30
    "a) Vegetables     b) Candy     c) Soda     d) Chips", // Question 31
  ];

  let answer = [
    "b", // Answer to Question 1
    "d", // Answer to Question 2
    "b", // Answer to Question 3
    "c", // Answer to Question 4
    "b", // Answer to Question 5
    "b", // Answer to Question 6
    "d", // Answer to Question 7
    "b", // Answer to Question 8
    "d", // Answer to Question 9
    "a", // Answer to Question 10
    "d", // Answer to Question 11
    "c", // Answer to Question 12
    "c", // Answer to Question 13
    "b", // Answer to Question 14
    "a", // Answer to Question 15
    "c", // Answer to Question 16
    "d", // Answer to Question 17
    "b", // Answer to Question 18
    "b", // Answer to Question 19
    "a", // Answer to Question 20
    "a", // Answer to Question 21
    "b", // Answer to Question 22
    "c", // Answer to Question 23
    "c", // Answer to Question 24
    "d", // Answer to Question 25
    "b", // Answer to Question 26
    "b", // Answer to Question 27
    "a", // Answer to Question 28
    "b", // Answer to Question 29
    "a", // Answer to Question 30
    "a", // Answer to Question 31
  ];


  RANinteger = int(random(0, 31));
  user_answer = prompt(question[RANinteger] + "\n" + choices[RANinteger]);

  if (user_answer.toLowerCase() == answer[RANinteger]) {
    score += 100;
    window.alert("Correct answer! ");
  } else {
    score += 5;
    window.alert("Wrong answer!, Nice attempt!! \n the right answer is, "+answer[RANinteger]);
  }
}
// create platforms
function createPlat (x,y){
  let plat= createSprite(x, y, 80, 40); 
  plat.collider = "s"; // Static ground
  plat.image = 'assets/groundtile.png'
  ground.add(plat)
  push(); //nore sure if this is needed
}

function createLava(x,y){
  let lava = createSprite(x, y, 80, 40); 
  lava.collider = "s"; // Static ground
  lava.image = 'assets/lava.png'
  
  if (gameState === 'level3'){ 
    lava.scale = 0.9
  }
  
  kill.add(lava)
  push(); //nore sure if this is needed  
}