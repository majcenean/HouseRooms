/*************************************************************************
  Rooms of a House
          by Maj Jenkins
          Feb. 23, 2021

    Overview:
    

    ---------------------------------------------------------------------
    Notes: 
     (1) Collision sprite causes lag exponentially
**************************************************************************/

/*************************************************************************
// Global variables
**************************************************************************/

//////////////////// state variable
// Variable that is a function 
var drawFunction;
var stateNumber = 0;
var gTextOffset = 50;
var instruct = ["INSTRUCTIONS", "________", "USE [W][A][S][D] to navigate", "Press [Q] for debug mode", "Press [F] for fullscreen", "________", "CLICK ANYWHERE TO CONTINUE"]

//////////////////// scene setup variable
// DebugMode
var gDebugMode = false;


// Room Background Rectangle
var rectPosX;
var rectPosY;
var rectW;
var rectH;
var rectLeft;
var rectRight;
var rectUp;
var rectDown;
var rIncrX;
var rIncrY;
var rCoordsX;
var rCoordsY;


//////////////////// p5 play variables

// Scene
var SCENE_W;
var SCENE_H;

// Background texture sprite
var bg;
var blackout;

// Main Sprite
var mainsprite;
var mainspriteW = 50;
var mainspriteH = 90;

// Main Sprite Controls
var speedleftup = 0;
var speedrightdown = 0;
var facing = 1;
var isidle = 0;
var stamina = 200;

/*************************************************************************
// Function preload
**************************************************************************/
function preload() {
  // blackout = loadImage('img/bg_texture/darkness.png');
}


/*************************************************************************
// Window resize
**************************************************************************/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*************************************************************************
// Function setup
**************************************************************************/
function setup() {
  // create the canvas
  createCanvas(windowWidth, windowHeight);

  // specifications
  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

  //////////////////// p5 play setup
  SCENE_W = windowWidth/2;
  SCENE_H = windowHeight/3;

  bg = new Group();
  mainsprite = createSprite(SCENE_W, SCENE_H, mainspriteW, mainspriteH);

  // // background texture
  // for (var i = 0; i < 25; i++) {
  //   var scuffs = createSprite(random(100, SCENE_W - 100), random(100, SCENE_H - 100));
  //   scuffs.addAnimation('usual', 'img/bg_texture/scuff.png');
  //   bg.add(scuffs);
  // }

  // mainsprite
  var mainspriteMove = mainsprite.addAnimation('idle',
    'img/mainsprite/1.png', 'img/mainsprite/3.png');

  mainsprite.addAnimation('moving', 'img/mainsprite/1.png', 'img/mainsprite/2.png');



  //////////////////// state setup
  // drawFunction = drawSplash;
  drawFunction = drawFloor1;
}


/*************************************************************************
// Function draw
**************************************************************************/
function draw() {
  background('#8A7B67');
  frameRate(46.5);

//////////////////// state functions
    // Call the state machine function (a variable)
    drawFunction();


//////////////////// debug mode
    // Toggle debug Mode
  if( gDebugMode == true ) {
    drawDebugInfo();
  }
  // Debug mode message
  push();
  fill(255);
  noStroke();
  textSize(20);
  text('Press [Q] for debug mode', 10, 20);
  pop();
}



/*************************************************************************
// States
**************************************************************************/
//-- drawSplash() will draw the image at index 5 from the array
drawSplash = function() {
  background(200);
  textSize(width/30);
  textAlign(CENTER);
  text("CLICK ANYWHERE TO START", width/2, 3*(height/4));
}

// Instructions state
drawInstructions = function() {
  background(250);
  // starting i at 0, as long as i is less than 9, add one to i
  // draw text calling from the instruct array, using the variable i to determine number in the array
  for (i=0; i < 9; i++) {
    push();
    textSize(30);
    fill(30);
    text(instruct[i], width/2, height/3.5+(i*gTextOffset));
    pop();
  }
}

drawFloor1 = function () {
    background(50);
    //////////////////// scene setup functions
    drawBackgroundBox();
    drawMainBath();
    drawLiving();
    drawFloor1Stairs();
    
    //////////////////// p5 play functions

    //set the camera position to the mainsprite position
    // camera.position.x = mainsprite.position.x;
    // camera.position.y = mainsprite.position.y;

    // draw the background sprites;
    // drawSprites(bg);

    // draw the main sprite;
    drawSprites();
    drawMainSprite();

    // needs to be at bottom to be drawn last
    // drawForegroundBox();
}



function mousePressed() {
  // If the splash or instruction states are up, a mouse click moves it along linearly
  if (drawFunction === drawSplash) {
      drawFunction = drawInstructions;
  }
    else if (drawFunction === drawInstructions) {
        drawFunction = drawFloor1;
    }
}


/*************************************************************************
// Scene draw functions
**************************************************************************/
function drawBackgroundBox() {
  noFill();
  stroke(255);
  strokeWeight(3);
  
  //   Rectangle room
  rectPosX = width/2;
  rectPosY = 3*(height/4);
  rectW = width/1.2;
  rectH = height/2.7;

  rectLeft = rectPosX - rectW/2;
  rectRight = rectPosX + rectW/2;
  rectUp = rectPosY - rectH/2;
  rectDown = rectPosY + rectH/2;

  fill('#B69271');

  // Background box
  rectMode(CENTER);
  rect(rectPosX, rectPosY, rectW, rectH);

  rIncrX = rectW/23;
  rIncrY = rectH/9;

  rCoordsX = [rIncrX*2, rIncrX*3, rIncrX*4, rIncrX*5, rIncrX*6, rIncrX*7, rIncrX*8, rIncrX*9, rIncrX*10, rIncrX*11, rIncrX*12, rIncrX*13, rIncrX*14, rIncrX*15, rIncrX*16, rIncrX*17, rIncrX*18, rIncrX*19, rIncrX*20, rIncrX*21, rIncrX*22, rIncrX*23, rIncrX*24];
  rCoordsY = [rectUp, rIncrY + rectUp, rIncrY*2 + rectUp, rIncrY*3 + rectUp, rIncrY*4 + rectUp, rIncrY*5 + rectUp, rIncrY*6 + rectUp, rIncrY*7 + rectUp, rIncrY*8 + rectUp, rIncrY*9 + rectUp, rIncrY*10 + rectUp];
}

function drawMainBath() {
  // Draw background
  fill(20, 20, 20, 70);
  noStroke();
  beginShape();
  vertex(rCoordsX[19], rCoordsY[0]);
  vertex(rCoordsX[15], rCoordsY[0]);
  vertex(rCoordsX[15], rCoordsY[5]);
  vertex(rCoordsX[19], rCoordsY[5]);
  endShape(CLOSE);

// // Test the points from the arrays
//   ellipse(rCoordsX[0], rCoordsY[3], 15);
//   ellipse(rCoordsX[1], rCoordsY[3], 15);
//   ellipse(rCoordsX[2], rCoordsY[3], 15);
//   ellipse(rCoordsX[3], rCoordsY[0], 15);
//   ellipse(rCoordsX[9], rCoordsY[4], 15);

  // Draw collision sprite
  // NOTE: CAUSES SERIOUS LAG?
  mainbath = createSprite(rCoordsX[15] + rIncrX*2, rCoordsY[0] + rIncrY*2.5, rCoordsX[19]-rCoordsX[15], rCoordsY[5]-rCoordsY[0]);
  mainbath.shapeColor = color(0, 0, 0, 0);
  mainsprite.collide(mainbath);
}

function drawFloor1Stairs() {
  let measureNumberY = 0;
  let measureLengthY = rIncrX*1.5;
  
    for (let i = rectUp; i <= rectDown + 2; i += 30) {
      push();
        fill('lightblue');
        noStroke();
        rectMode(CENTER);
        rect(rectRight - measureLengthY/2, i, measureLengthY, 20);
      pop();
      measureNumberY++;
    }
}

function drawLiving() {
  // Stair step into the kitchen
  stroke(100);
  strokeWeight(2);
  line(rCoordsX[9], rCoordsY[0], rCoordsX[9], rCoordsY[9]);
  line(rCoordsX[9] + 20, rCoordsY[0], rCoordsX[9] + 20, rCoordsY[9]);
}


function drawKitchen() {

}








/*************************************************************************
// Debug and interaction functions
**************************************************************************/

function drawMeasure() {
//   Ruler for X-axis
  let measureLengthX = 10;
  let measureNumberX = 0;
  
    for (let i = rectLeft; i <= rectRight + 2; i += rectW/23) {
      line(i, rectDown, i, rectDown - measureLengthX);
      push();
      noStroke();
      fill(255);
      textAlign(CENTER);
      textSize(20);
      text(measureNumberX, i, rectDown + measureLengthX*3);
      pop();
      measureNumberX++;
    }

//   Ruler for Y-axis
  let measureNumberY = 0;
  let measureLengthY = 10;
  
    for (let i = rectUp; i <= rectDown + 2; i += rectH/9) {
      line(rectLeft, i, rectLeft - measureLengthY*2, i);
      push();
      noStroke();
      fill(255);
      textAlign(RIGHT);
      textSize(20);
      text(measureNumberY, rectLeft - measureLengthY*3, i);
      pop();
      measureNumberY++;
    }
}

// Debug mode
function drawDebugInfo() {
  // draw text with mouse x/y coords
  push();
    fill(255);
    noStroke();
    textSize(20);
    text("X: " + mouseX + "   Y: " + mouseY, 10, 50);
  pop();

  // Points of background rectangle
  ellipseMode(CENTER);
  // Upper left
  ellipse(rectPosX - rectW/2, rectPosY - rectH/2, 10);
  // Upper right
  ellipse(rectPosX + rectW/2, rectPosY - rectH/2, 10);
  // Lower left
  ellipse(rectPosX - rectW/2, rectPosY + rectH/2, 10);
  // Lower right
  ellipse(rectPosX + rectW/2, rectPosY + rectH/2, 10);

  // Draw the rulers
  drawMeasure();

  // allow player to zoom in and out with click
  // zoomInOut();
}


// keyTyped for debugMode and fullscreen
function keyTyped() {
  if (key === 'q') {
    gDebugMode = !gDebugMode;
  }
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
 }


/*************************************************************************
// p5 play functions
**************************************************************************/

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
  //keep stamina within 0 to 200 points
  if (stamina >= 200) {
    stamina = 200;
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

  //trapping the main sprite inside the housebox
 if (mainsprite.position.x < rectLeft + mainspriteW - mainspriteW/2)
    mainsprite.position.x = rectLeft + mainspriteW - mainspriteW/2;
  if (mainsprite.position.y < rectPosY - rectH + mainspriteH*2)
    mainsprite.position.y = rectPosY - rectH + mainspriteH*2;
  if (mainsprite.position.x > rectRight - mainspriteW + mainspriteW/2)
    mainsprite.position.x = rectRight - mainspriteW + mainspriteW/2;
  if (mainsprite.position.y > rectDown - mainspriteH/2)
    mainsprite.position.y = rectDown - mainspriteH/2;

  //shadow underneath the main sprite
  push();
  noStroke();
  fill(25, 25, 25, 70);
  ellipse(mainsprite.position.x, mainsprite.position.y + mainspriteH/2, mainspriteW+mainspriteW/3, mainspriteH/6);
  pop();

  // draw the mainsprite
  // drawSprite(mainsprite);

  // if the shift key is down OR stamina is less than 180 pts; then draw the stamina bar above head of mainsprite
  if ((keyIsDown(16)) || (stamina <= 180)) {
    // draw the stamina bar
    drawStamina();
  }
}

function drawStamina() {
  push();
  rectMode(CORNER);
  noStroke();
  fill(100);
 rect(mainsprite.position.x - mainspriteW/1.5, mainsprite.position.y - mainspriteH, 210/3, 15);
  fill('lightgreen');
  rect(mainsprite.position.x + 15/4 - mainspriteW/1.5, mainsprite.position.y + 15/4 - mainspriteH, stamina/3, 7.5);
  pop();
}

function zoomInOut() {
  if (mouseIsPressed)
    camera.zoom = 0.5;
  else
    camera.zoom = 0.9;
}