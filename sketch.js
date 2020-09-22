var gameState = "start";
var sprite,backG;
var count = 0;
var startPage;
var health1,health2,health3;
var healthCount = 3;
var number = 3;
var lives  = 5;
var restart;
function preload(){
run = loadAnimation("tenor-unscreen.gif");
backImg = loadImage("1.jpg");
rhinoImg1 = loadAnimation("depositphotos_135998394-stock-illustration-angry-rhino-cartoon.png");
rhinoImg2  = loadAnimation("depositphotos_135998394-stock-illustration-angry-rhino-cartoon.png");
animal1 = loadAnimation("puma.gif");
healthImg = loadImage("OIP.png");
startImag = loadImage("th (3).jpg");
animal2 = loadAnimation("shiraImg.gif");
restartImg = loadImage("restart-button-hi.png");
}

function setup(){
  createCanvas(1450, 650);
  backG = createSprite(600,50,10,10);
  backG.addImage(backImg);
  backG.scale = 2.4;

  restart = createSprite(width,height/2,20,20);
  
  restart = createSprite(width/2-30,height/2+100,20,20);
  restart.scale = 0.2;
  restart.addImage(restartImg);
  restart.visible= false;
  
  sprite = createSprite(1110,450,50,50);
  sprite.addAnimation("running",run);
  sprite.scale = 0.8;
  rectMode(CENTER);
  animalGroup = new Group();


  //lives
  heart1=createSprite(1000,50,10,10);
  heart1.addImage(healthImg)
  heart1.scale = 0.3;

  heart2=createSprite(1075,50,10,10);
  heart2.addImage(healthImg);
  heart2.scale = 0.3

  heart3=createSprite(1150,50,10,10);
  heart3.addImage(healthImg);
  heart3.scale = 0.3;

  heart4=createSprite(1225,50,10,10);
  heart4.addImage(healthImg)
  heart4.scale = 0.3;

  heart5=createSprite(1300,50,10,10);
  heart5.addImage(healthImg)
  heart5.scale = 0.3;

}


function draw() {
  rectMode(CENTER);
  if(gameState === "start"){
    image(backImg,0,-400,1500,1000);
    count = 0;
    fill("red");
    textSize(35);
    text("The Stampede",width/2-100,100)
    fill("green");
    textSize(25);
    text("press SPACEBAR to play",width/2-100,height/2);
    text("Use Up And Down Arrow Keys To Move",width/2-200,height/2+100)
  }
   if(gameState === "play"){
     
     background(255,255,255);  

  if(backG.x<650){
    backG.x = width/2;
    backG.velocityX = -1;
  }
  if(background.velocityX>0){
    sprite.addAnimation("running",run)
  }  
    sprite.velocityX = 0;
    backG.velocityX = -1;
    sprite.addAnimation("running",run)
  
  if(keyWentUp(RIGHT_ARROW)){
    sprite.velocityX = 0;
    backG.velocityX = 0;
    }
    if(keyWentUp(UP_ARROW)){
     sprite.velocityY = 2;
    }
    if(keyWentDown(UP_ARROW)){
     sprite.velocityY = -2;
    }
    if(keyWentDown(DOWN_ARROW)){
     sprite.y = sprite.y+5;
    }
 // camera.position.y = sprite.y-150;
    fill("green");
   //ellipse(sprite.x,sprite.y,80,80);
   /*if(healthcount = 3 && animalGroup.isTouching(sprite)){
   healthCount = 2;
   health3.destroy();
   }
   else if(healthCount = 2 && animalGroup.isTouching(sprite)){
    healthCount = 1;
    health2.destroy();
  }
   
  else if(healthCount =  1 && animalGroup.isTouching(sprite)){
    healthCount = 0;
    health1.destroy();
    sprite.destroy();
   }
   if(healthCount<3){
     health1.destroy();
   }
   else if(healthCount<2){
      health2.destroy();
   }
   else if(healthCount<1){
      health1.destroy(); 
   }*/
  Lives();
  for (var i = 0; i < animalGroup.maxDepth(); i++) {
  
    var animal = animalGroup.get(i);
    
    if (animal != null && animal.isTouching(sprite)) {
       lives = lives-1;
     if(animal.isTouching(sprite)){
     //sprite.destroy();
     animal.destroy();  }   
     //gameState = "end";
    }  
  }
  drawSprites();
  fill("red");  
  textSize(25);
  text("Time :" +count+" seconds",50,50);

      
 animals();
//text("life"+lives,50,300)
 count = Math.round(frameCount/5);
 console.log(count);

 
}

if(gameState === "end"){
  restart.visible = true;
    fill("red");
    textSize(45);
    text("Game Over",width/2-150,height/2);
    fill("white");
    textSize(25)
    text("You survived for "+count+" seconds",width/2-190,height/2+50);
     animalGroup.visible = false;  
 
    if(mousePressedOver(restart)) {
      gameState = "play";  
    }
  }
}

function animals(){


  if(frameCount % 96 === 0) {
    var obstacle = createSprite(10,500,10,40);
    obstacle.y = random(300,500);
    obstacle.velocityX = 6;
    var rand = Math.round(random(1,2));
    switch(rand){
     case  1:obstacle.addAnimation("chasing",animal1);
          break;
     case  2:obstacle.addAnimation("chasing",animal2);
          break;
          default : break;
    }
  
     obstacle.scale = random(0.5,0.8);;
    obstacle.setCollider("rectangle",0,0,300,100);
     obstacle.lifetime = 225;
    animalGroup.add(obstacle);
    
 }
}
function keyPressed(){
  if(keyCode === 32){
    gameState = "play";
    count = 0;
  }  
  
  

}
function stopCount(){
  count = 0;
}
function Lives(){
  
  if(lives == 4){
    heart5.visible = false;
}
 if(lives == 3){
   heart4.visible = false;
 }

   if(lives == 2){
      heart3.visible = false;
  }
   if(lives == 1){
     heart2.visible = false;
   }
   if(lives == 0){
    sprite.destroy();
     heart1.visible = false;
     gameState = "end";
    }
}