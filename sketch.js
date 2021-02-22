// Background texture sprite
var bg;

// Main Sprite
var mainsprite;
var mainspriteW = 250;
var mainspriteH = 450;

// Main Sprite Controls
var speedleftup = 0;
var speedrightdown = 0;
var facing = 1;
var isidle = 0;
var stamina = 300;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  var SCENE_W = windowWidth;
  var SCENE_H = windowHeight * 3;

  bg = new Group();
  mainsprite = createSprite(SCENE_W/2, SCENE_H, mainspriteW, mainspriteH);

  // background texture
  for (var i = 0; i < 25; i++) {
    var scuffs = createSprite(random(100, SCENE_W - 100), random(100, SCENE_H - 100));
    scuffs.addAnimation('usual', 'img/bg_texture/scuff.png');
    bg.add(scuffs);
  }

  // mainsprite
  var mainspriteMove = mainsprite.addAnimation('idle',
    'img/mainsprite/1.png', 'img/mainsprite/3.png');

  mainsprite.addAnimation('moving', 'img/mainsprite/1.png', 'img/mainsprite/2.png');
}


function draw() {
  background('#3c4f3a');
  frameRate(46.5);

  //set the camera position to the mainsprite position
  camera.position.x = mainsprite.position.x;
  camera.position.y = mainsprite.position.y;




  drawHouse();

  // draw the background sprites;
  drawSprites(bg);

  // draw the main sprite;
  drawMainSprite();
  
  drawStamina();
  zoomInOut();
}


function drawHouse() {
    // the house background
  push();
  rectMode(CORNER);
  fill(200);
  noStroke();
  rect(0, 0, windowWidth, windowHeight * 3);
  pop();
}



function drawMainSprite() {
  //accelerate with shift
  if ((keyIsDown(16)) && (stamina >= 0)) {
    speedleftup -= 0.2;
    speedrightdown += 0.2;
    stamina -= 2.5;
  } else {
    speedleftup = 0;
    speedrightdown = 0;
    stamina += 2;
  }
  //keep stamina within 0 to 300 points
  if (stamina >= 300) {
    stamina = 300;
  }
  if (stamina <= 0) {
    stamina = 0;
  }
  //if stamina runs out, cannot run anymore
  if (stamina == 0) {
    mainsprite.velocity.x = -4;
    mainsprite.velocity.y = -4;
    speedleftup = 0;
    speedrightdown = 0;
  }

  //control mainsprite with WASD
  //left with A
  if (keyIsDown(65)) {
    mainsprite.changeAnimation('moving');
    mainsprite.mirrorX(-1);
    mainsprite.velocity.x = -4 + speedleftup;
    facing = -1;
    isidle = 1;
  }
  //right with D
  else if (keyIsDown(68)) {
    mainsprite.changeAnimation('moving');
    mainsprite.mirrorX(1);
    mainsprite.velocity.x = 4 + speedrightdown;
    facing = 1;
    isidle = 1;
  }
  //down with S
  else if (keyIsDown(83)) {
    mainsprite.changeAnimation('moving');
    mainsprite.velocity.y = 4 + speedrightdown;
    isidle = 1;
  }
  //up with W
  else if (keyIsDown(87)) {
    mainsprite.changeAnimation('moving');
    mainsprite.velocity.y = -4 + speedleftup;
    isidle = 1;
  } else {
    mainsprite.changeAnimation('idle');
    mainsprite.velocity.x = 0;
    mainsprite.velocity.y = 0;
    isidle = 0;
  }

  //trapping the main sprite inside the canvas area >:3c
  // WINDOWWIDTH SHOULD EQUAL SCENE_W, BUT IT CANT USE THAT VARIABLE, SO CHANGE IT
  if (mainsprite.position.x < 0 + mainspriteW/2)
    mainsprite.position.x = 0 + mainspriteW/2;
  if (mainsprite.position.y < 0 + mainspriteH/2)
    mainsprite.position.y = 0 + mainspriteH/2;
  if (mainsprite.position.x > windowWidth - mainspriteW/2)
    mainsprite.position.x = windowWidth - mainspriteW/2;
  if (mainsprite.position.y > windowHeight * 3 - mainspriteH/2)
    mainsprite.position.y = windowHeight * 3 - mainspriteH/2;

  //shadow underneath the main sprite
  noStroke();
  fill(25, 25, 25, 70);
  ellipse(mainsprite.position.x, mainsprite.position.y + 200, 250, 70);
  drawSprite(mainsprite);
}

function drawStamina() {
  push();
  fill('#E3AFB0');
  rect(camera.position.x - width / 2 + 15 - mainsprite.velocity.x, camera.position.y - height / 2 + 15 - mainsprite.velocity.y, 310, 30);
  noStroke();
  fill(38, 9, 159);
  rect(camera.position.x - width / 2 + 20 - mainsprite.velocity.x, camera.position.y - height / 2 + 20 - mainsprite.velocity.y, stamina, 20);
  pop();
}

function zoomInOut() {
  if (mouseIsPressed)
    camera.zoom = 0.5;
  else
    camera.zoom = 0.9;
}