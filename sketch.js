var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var spookySound;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(275, 450);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  
}

function draw() {
  background(0);
  spookySound.loop();
  if (gameState === "play") {
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.8;

    if (tower.y > 400) {
      tower.y = 300;
    }

    spawnDoors();

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (doorsGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }

    drawSprites();
  }

  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    

    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    

    ghost.depth = door.depth;
    ghost.depth += 1;

    door.lifetime = 800;
    climber.lifetime = 800;
  

    doorsGroup.add(door);
    climbersGroup.add(climber);
    
  }
}



