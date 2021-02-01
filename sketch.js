var forest,forestImg;
var girl,girlImg,girlfall;
var invisibleGround;
var bat,batImg,batGroup;
var PLAY=1;
var END=0
var gameState=PLAY;
var gameOver,gameOverImg;
var score;

function preload(){
  forestImg=loadImage("forest.jpg");
  girlImg=loadAnimation("girl1.png","girl2.png")
  girlfall=loadAnimation("girlfall.png")
  batImg=loadAnimation("bat1.png","bat2.png");
  gameOverImg=loadImage("gameOver.png");

}

function setup() {
  createCanvas(600,600);
  forest=createSprite(400,300);
  forest.addImage(forestImg);
  forest.velocityX=-2;
  forest.scale=0.25
  
  girl=createSprite(90,490,20,40);
  girl.addAnimation("cycling",girlImg);
  girl.scale=0.1
  
  invisibleGround=createSprite(200,540,400,10)
  invisibleGround.visible=false
  
  batGroup=new Group();
 girl.setCollider("circle",0,0,400)
  girl.debug=true
  
  gameOver=createSprite(300,300);
  gameOver.addImage(gameOverImg)
  
  score=0;
}

function draw() {
  
   
  
  //console.log(girl.y)   
  
  if(gameState===PLAY){
    
  score=score+Math.round(frameCount/100);
  
  if(forest.x < 0 ){
    forest.x = width/2;
  }
  
  if(keyDown("space")&& girl.y>=495){
    girl.velocityY=-10
  }
  
  girl.velocityY=girl.velocityY+0.3
    
    spawnBat();
    
    gameOver.visible=false
    
    if( batGroup.isTouching(girl)){
  gameState=END

  }
    
    if( gameState===END){
   girl.addAnimation("fall",girlfall)
    girl.changeAnimation("fall");
   forest.velocityX=0;
   bat.velocityX=0;
      girl.velocityY=0;
      gameOver.visible=true
      batGroup.setLifetimeEach(-1);

  }
  }
  
  girl.collide(invisibleGround)
  
  
  
 
  
  drawSprites();
  textSize(24);
  stroke("red")
 text("Score: "+ score, 400,100);
}

function spawnBat(){
  if(frameCount % 100===0){
     bat=createSprite(550,250,10,10)
 bat.addAnimation("flying",batImg);
    bat.y=Math.round(random(10,500))
  bat.velocityX=-4
  bat.scale=0.3
    batGroup.add(bat)
    bat.lifetime=200
  }
}