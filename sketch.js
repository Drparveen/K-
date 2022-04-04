var engine
var world
var ground;
var earthimg;
var spaceimg;
var sunimg;
var hanumanjiimg;
var hero;
var sun;
var bar, bargroup;
var paddle, paddlegroup
var  bird,birdImg
var gameState="start";






function preload() {
  earthimg = loadImage("/assets/background1.jpg");
  spaceimg = loadImage("/assets/SPACE1.jpg")
  hanumanjiimg = loadImage("/assets/hanumanji2.png");
  sunimg = loadImage("/assets/SUNPICK1.jpg");
  birdImg=loadAnimation("/assets/bird/bird1.png", "/assets/bird/bird2.png","/assets/bird/bird3.png", "/assets/bird/bird4.png", "/assets/bird/bird5.png")

}

function setup() {
  createCanvas(1200, 600);
  
    
  ground = createSprite(750, 580, 1500, 50)


  hero = createSprite(300, 450, 30, 20,);
  hero.addImage(hanumanjiimg)
  hero.scale = 0.3;
  hero.debug=true;
  hero.setCollider("rectangle",0,0,90,350)

  sun = createSprite(1150, 50, 30, 20,);
  sun.addImage(sunimg)
  sun.scale = 0.15;
  sun.debug=true;
  sun.setCollider("circle",0,0,700)

  //World.add(world,hero);
  paddlegroup = new Group();
  bargroup = new Group();



}

function draw() {

  background(earthimg);
  if(gameState=="start"){
    textSize(50);
    stroke("white")
    fill ( "white")
     text("Beware of bird ki chung ", 200,250);
     text("Climb the bird from back to reach sun ",200,350); 
     text("Press UP Arrow to start game  ",200,450); 
   }
   if(keyDown("UP_ARROW")){
     gameState="play";
   }
   if(gameState=="play"){
  hero.velocityY += 0.9;
  hero.collide(ground)


  if (keyDown("SPACE") && hero.y > 0) {
    hero.y-= 20
  }

  if (keyDown("DOWN_ARROW") && hero.y < 500) {
    hero.y += 2
  }
  if (keyDown("RIGHT_ARROW") && hero.x < 1150) {
    hero.x += 2
  }

  if (keyDown("LEFT_ARROW") && hero.x > 0) {
    hero.x -= 2
  }
  

  hero.bounceOff(bargroup);

  if(hero.isTouching(bargroup)){
   hero.velocityX=0;
   hero.velocityY=0;
    
hero.x=300;
hero.y=450;
  }
 if ( hero.x>1210){
  hero.x=300;
  hero.y=450;
 }
 hero.collide(paddlegroup);

  if(hero.collide(sun)){
    background(spaceimg);
    hero.x=1150;

    hero.y=50;
    sun.visible=false;
    hero.visible=false;

    paddlegroup.destroyEach();
    bargroup.destroyEach();
    textSize(50);
    stroke("white")
    fill ( "white")
    text("I am full ",550,200);
    text("JAI SHREE RAM ",550,250)

  }
  drawSprites()
  spawn_paddel()
}
}

function spawn_paddel() {
  if (frameCount % 130 === 0) {
    paddle = createSprite(00, 100, 50, 10)
    paddle.y = Math.round(random(100, 400));
    paddle.velocityX = +2;
    paddle.lifetime = 900;
    paddlegroup.add(paddle)
    paddle.shapeColor="pink"
    paddle.addAnimation("fly",birdImg)
    paddle.scale=0.7;
    paddle.debug=true;
   paddle.setCollider("circle",10,5,30)


    bar = createSprite(00, 100, 70, 10)
    bar.y = paddle.y + 5;
    bar.velocityX = +2;
    bar.lifetime = 900;
    bar.visible = false;
    bar.debug = false;
    bargroup.add(bar);

  }

} 