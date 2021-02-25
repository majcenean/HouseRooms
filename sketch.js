/*************************************************************************
  Rooms of a House
          by Maj Jenkins
          Feb. 25, 2021

    Overview:
    

    ---------------------------------------------------------------------
    Notes: 
     (1) 
**************************************************************************/

/*************************************************************************
// Global variables
**************************************************************************/
// Variables of images
var imgBg = [];
var imgChar = [];
var splash_img;
var cursor;

var imgRatio = 1.7;
var gTextOffset = 50;

var imgMouse;
var imgWASD;
var imgARROWS;
var wasdX;
var wasdY;
var arrowX;
var arrowY;

// Variables of fonts
var fontMtHills;
var fontCoco;

// String arrays
var colorsRow1 = ["#FADEA8", "#EBB07A", "#E8CFBF", "#D1CFB2"];
var colorsRow2 = ["#E3B585", "#D98A70", "#B59E8F", "#6E4538"];
var colorsRow3 = ["#918F6B", "#A1D1C2", "#9CB5C9", "#4F99B8"];
var colorsRow4 = ["#BFCCB0", "#7D7A66", "#C9CCCF", "#969496"];
var instruct = ["INSTRUCTIONS", "________", "USE [W][A][S][D] to navigate forwards, backwards, and sideways", "Use the UP AND DOWN ARROW KEYS to ascend and descend floors", "Press [F] for fullscreen",  "Press [I] to pull up this instruction screen again", "________", "PRESS [ESC] OR CLICK ANYWHERE TO CONTINUE"]

// Variable that is a function 
var drawFunction;

// Beginning the state at 0
var stateNumber = 0;
var stateFunctions = [];

/*************************************************************************
// Window resize
**************************************************************************/
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/*************************************************************************
// Function preload
**************************************************************************/
function preload() {
  // State Images
    splash_img = loadImage('assets/img/splash.png');
    cursor = loadImage('assets/cursor.png');
    imgBg[0] = loadImage('assets/img/sims_screenshots/living.png');
    imgBg[1] = loadImage('assets/img/sims_screenshots/garden.png');
    imgBg[2] = loadImage('assets/img/sims_screenshots/kitchen.png');
    imgBg[3] = loadImage('assets/img/sims_screenshots/mainbath.png');
    imgBg[4] = loadImage('assets/img/sims_screenshots/hallway.png');
    imgBg[5] = loadImage('assets/img/sims_screenshots/bedroom.png');
    imgBg[6] = loadImage('assets/img/sims_screenshots/patio.png');
    imgBg[7] = loadImage('assets/img/sims_screenshots/masterbath.png');
    imgBg[8] = loadImage('assets/img/sims_screenshots/loft.png');

  // Instruction Images
    imgMouse = loadImage('assets/img/instruct/mouse.png');
    imgWASD = loadImage('assets/img/instruct/wasd.png');
    imgARROWS = loadImage('assets/img/instruct/arrows.png');

  // Fonts
    fontMtHills = loadFont('assets/fonts/mount_hills.otf');
    fontBulletin = loadFont('assets/fonts/LTBulletin-Medium.otf');
}

/*************************************************************************
// Function setup
**************************************************************************/
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);
    textFont(fontBulletin);

    // Set to splash screen for startup
    drawFunction = drawSplash;
}

/*************************************************************************
// Function draw
**************************************************************************/
function draw() {
    background('#B7CCD5');
    fill('#fff');
    textAlign(CENTER);
    textSize(width/45);
    noStroke();
    ellipseMode(CENTER);
    rectMode(CENTER);
    imageMode(CENTER);
    // noCursor();

    // Call the state machine function (a variable)
    drawFunction();
}

/*************************************************************************
// States
**************************************************************************/
// Position the instructions
  wasdX = width/4;
  wasdY = 5*(height/6);
  arrowX = 3*(width/4);
  arrowY = 5*(height/6);

drawSplash = function() {
  background(colorsRow1[0]);
  image(splash_img, width/2, height/2, 1920/imgRatio, 1080/imgRatio);

  // Title
  push();
    textFont(fontMtHills);
    textSize(width/20);
    text("My House", width/3, height/3);
  pop();

  // click to enter text
  text("CLICK TO ENTER", width/2.7, 1.6*(height/4));

  image(imgMouse, width/3, 2*(height/4), 300, 300);

  // custom bird cursor (must stay at bottom of function order)
  noCursor();
  image(cursor, mouseX, mouseY, 50, 50);
}

drawInstructions = function() {
  background(colorsRow1[1]);
  // starting i at 0, as long as i is less than 9, add one to i
  // draw text calling from the instruct array, using the variable i to determine number in the array
  for (i=0; i < 9; i++) {
    textSize(35);
    text(instruct[i], width/2, height/3.5+(i*gTextOffset));
  }

  // Draw images
  image(imgWASD, wasdX, wasdY, 300, 300);
  image(imgARROWS, arrowX, arrowY, 300, 300);
}


//////// Rooms

drawLiving = function () {
  background(colorsRow1[3]);
  image(imgBg[0], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

drawGarden = function () {
  background(colorsRow4[1]);
  image(imgBg[1], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

drawKitchen = function () {
  background(colorsRow1[0]);
  image(imgBg[2], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

drawMainBath = function () {
  background(colorsRow3[0]);
  image(imgBg[3], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

drawHallway = function () {
  background(colorsRow4[3]);
  image(imgBg[4], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

drawBedroom = function () {
  background(colorsRow3[2]);
  image(imgBg[5], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

drawPatio = function () {
  background(colorsRow4[2]);
  image(imgBg[6], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

drawMasterBath = function () {
  background(colorsRow3[3]);
  image(imgBg[7], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

drawLoft = function () {
  background(colorsRow2[3]);
  image(imgBg[8], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

// Array of functions (cannot be called before preload because these functions have not yet been created)
  // stateFunctions[0] = drawSplash;
  // stateFunctions[1] = drawInstructions;
  stateFunctions[0] = drawLiving;
  stateFunctions[1] = drawKitchen;
  stateFunctions[2] = drawGarden;
  stateFunctions[3] = drawMainBath;
  stateFunctions[4] = drawHallway;
  stateFunctions[5] = drawBedroom;
  stateFunctions[6] = drawPatio;
  stateFunctions[7] = drawMasterBath;
  stateFunctions[8] = drawLoft;


/*************************************************************************
// Custom functions
**************************************************************************/



/*************************************************************************
// Control / interaction functions
**************************************************************************/
// Navigate the states
function keyPressed() {

  if (drawFunction === drawLiving) {  // living
    if (key === 'w') {
        drawFunction = drawKitchen;
    }
    if (key === 'a') {
        drawFunction = drawGarden;
    }
  }
  else if (drawFunction === drawKitchen) {  // kitchen
    if (keyCode === UP_ARROW) {
        drawFunction = drawHallway;
    }
    if (key === 'a') {
        drawFunction = drawMainBath;
    }
    if (key === 's') {
        drawFunction = drawLiving;
    }
  } 
  else if (drawFunction === drawGarden) {  // garden
      if (key === 'd') {
        drawFunction = drawLiving;
    }
  }
  else if (drawFunction === drawHallway) {  // living
    if (key === 'w') {
        drawFunction = drawBedroom;
    }
    if (keyCode === DOWN_ARROW) {
        drawFunction = drawKitchen;
    }
    if (keyCode === UP_ARROW) {
        drawFunction = drawLoft;
    }
  }
  else if (drawFunction === drawBedroom) {  // living
    if (key === 'w') {
        drawFunction = drawPatio;
    }
    if (key === 'a') {
        drawFunction = drawMasterBath;
    }
    if (key === 's') {
        drawFunction = drawHallway;
    }
  }
  else if (drawFunction === drawPatio) {  // living
    if (key === 's') {
        drawFunction = drawBedroom;
    }
  }
  else if (drawFunction === drawMainBath) {  // living
    if (key === 'd') {
        drawFunction = drawKitchen;
    }
  }
  else if (drawFunction === drawMasterBath) {  // living
    if (key === 'd') {
        drawFunction = drawBedroom;
    }
  }
  else if (drawFunction === drawLoft) {  // living
    if (keyCode === DOWN_ARROW) {
        drawFunction = drawHallway;
    }
  }

  // I for instructions state
  if (key === 'i') {
      drawFunction = drawInstructions;
  }

  // Escape key to exit instructions state
  if (key === 'Escape') {
    if (drawFunction === drawInstructions) {
      drawFunction = stateFunctions[stateNumber];
    }
  }

  // Fullscreen toggle
  if (key === 'f') {
      let fs = fullscreen();
      fullscreen(!fs);
  }
}

//Splash to instructions to first
function mousePressed() {
  // If the splash or instruction states are up, a mouse click moves it along linearly
  if (drawFunction === drawSplash) {
      drawFunction = drawInstructions;
  }
    else if (drawFunction === drawInstructions) {
        drawFunction = stateFunctions[stateNumber];
    }
}