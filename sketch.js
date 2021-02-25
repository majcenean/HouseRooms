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
// Scene Images
var imgBg = [];
var imgChar = [];
var splash_img;
var cursor;
var imgRatio = 1.7;
var imgDeco = [];

// Control key images Part 1
var imgMouse;
var imgMouseGrey;
var imgWASD;
var imgARROWS;
var imgRightARROWS;

// Control image X and Y position and width/height
var wasdX;
var wasdY;
var arrowX;
var arrowY;
var instructWH;

// Control key images Part 2
var imgKeyI;
var imgKeyF;
var imgKeyEsc;
var imgInstruct = [];
var gTextOffset = 120;
var instructPgWH = 200;

// Fonts
var fontMtHills;
var fontCoco;

// String arrays
var colorsRow1 = ["#FADEA8", "#EBB07A", "#E8CFBF", "#D1CFB2"];
var colorsRow2 = ["#E3B585", "#D98A70", "#B59E8F", "#6E4538"];
var colorsRow3 = ["#918F6B", "#A1D1C2", "#9CB5C9", "#4F99B8"];
var colorsRow4 = ["#BFCCB0", "#7D7A66", "#C9CCCF", "#969496"];
var instruct = ["USE [W][A][S][D] to navigate\nforwards, backwards, and sideways", "Use the UP AND DOWN arrow keys to\nascend and descend floors", "Press [F] for fullscreen",  "Press [I] to pull up the instruction screen", "PRESS [ESC] OR CLICK ANYWHERE TO CONTINUE"]

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
    imgBg[9] = loadImage('assets/img/sims_screenshots/outside.png');

  // Instruction Images
    imgMouse = loadImage('assets/instruct/mouse.png');
    imgMouseGrey = loadImage('assets/instruct/mouse_grey.png');
    imgWASD = loadImage('assets/instruct/wasd.png');
    imgARROWS = loadImage('assets/instruct/arrows.png');
    imgRightARROWS = loadImage('assets/instruct/arrows_faceright.png');
    imgKeyI = loadImage('assets/instruct/i_key.png');
    imgKeyF = loadImage('assets/instruct/f_key.png');
    imgKeyEsc = loadImage('assets/instruct/esc_key.png');

    imgInstruct =[imgWASD, imgRightARROWS, imgKeyF, imgKeyI, imgKeyEsc];

  // Decoration Images
    imgDeco[0] = loadImage('assets/deco/deco_living.png');
    imgDeco[1] = loadImage('assets/deco/deco_garden.png');
    imgDeco[2] = loadImage('assets/deco/deco_kitchen.png');
    imgDeco[3] = loadImage('assets/deco/deco_bathroom.png');
    imgDeco[4] = loadImage('assets/deco/deco_hallway.png');
    imgDeco[5] = loadImage('assets/deco/deco_bedroom.png');
    imgDeco[6] = loadImage('assets/deco/deco_patio.png');
    imgDeco[7] = loadImage('assets/deco/deco_loft.png');

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
    textSize(30);
    textAlign(CENTER);
    noStroke();
    ellipseMode(CENTER);
    rectMode(CENTER);
    imageMode(CENTER);
    // noCursor();

    // Call the state machine function (a variable)
    drawFunction();
    drawInstructMessage();
}

/*************************************************************************
// States
**************************************************************************/

drawSplash = function() {
  background(colorsRow1[0]);
  image(splash_img, width/2, height/2, 1920/imgRatio, 1080/imgRatio);

  // Title
  push();
    textFont(fontMtHills);
    textSize(width/20);
    text("My House", width/3, height/3);
  pop();

  push();
    textAlign(LEFT);
    imageMode(CORNER);
    // click to enter text
    text("CLICK TO ENTER", width/3 - 50, 1.6*(height/4));

    // mouse instruction
    image(imgMouse, width/3 - width/14 - 55, 1.4*(height/4), width/14, width/14);
  pop();

  // custom bird cursor (must stay at bottom of function order)
  noCursor();
  image(cursor, mouseX, mouseY, 50, 50);
}

drawInstructions = function() {
  background(colorsRow1[1]);
  // starting i at 0, as long as i is less than 9, add one to i
  // draw text calling from the instruct array, using the variable i to determine number in the array
  push();
  textSize(40);
  text('KEYS & CONTROLS', width/4, height/5 - gTextOffset/2);
  pop();

  for (i=0; i < 5; i++) {
    push();
    textSize(35);
    textAlign(LEFT);
    text(instruct[i], width/4, height/4+(i*gTextOffset));
    pop();
    image(imgInstruct[i], width/6, height/4+(i*gTextOffset), instructPgWH, instructPgWH);
  }
}

//////// Rooms

// // W
// text('Room', wasdX+instructWH/8, wasdY-instructWH/3);
// // A
// text('Room', wasdX-instructWH/1.5, wasdY);
// // S
// text('Room', wasdX-instructWH/8, wasdY+instructWH/2.8);
//  // D
// text('Room', wasdX+instructWH/1.25, wasdY+15);


drawLiving = function () {
  background(colorsRow1[3]);
  image(imgBg[0], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[0], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);

  // W
  text('Kitchen', wasdX+instructWH/8, wasdY-instructWH/3);
  // A
  text('Garden', wasdX-instructWH/1.5, wasdY);
  // S
  text('Exit Front Door', wasdX-instructWH/8, wasdY+instructWH/2.8);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Living Room", 100, 100);
  pop();

  stateNumber = 0;
}

drawGarden = function () {
  background(colorsRow4[1]);
  image(imgBg[1], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[1], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);


  // D
  text('Living Room', wasdX+instructWH/1.25, wasdY+15);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Garden", 100, 100);
  pop();

  stateNumber = 2;
}

drawKitchen = function () {
  background(colorsRow1[0]);
  image(imgBg[2], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[2], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);

  // Up Arrow
  text('2nd Floor', arrowX-instructWH/8, arrowY-instructWH/3);
  // A
  text('Bathroom', wasdX-instructWH/1.5, wasdY);
  // S
  text('Living Room', wasdX-instructWH/8, wasdY+instructWH/2.8);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Open Kitchen", 100, 100);
  pop();

  stateNumber = 1;
}

drawMainBath = function () {
  background(colorsRow3[0]);
  image(imgBg[3], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[3], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);

  // D
  text('Kitchen', wasdX+instructWH/1.25, wasdY+15);
    // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Bathroom", 100, 100);
  pop();

  stateNumber = 3;
}

drawHallway = function () {
  background(colorsRow4[3]);
  image(imgBg[4], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[4], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);

  // W
  text('Bedroom', wasdX+instructWH/8, wasdY-instructWH/3);

  // Up Arrow
  text('3rd Floor', arrowX-instructWH/8, arrowY-instructWH/3);
  // Down Arrow
  text('1st Floor', arrowX-instructWH/8, arrowY+instructWH/3);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("2nd Floor Hallway", 100, 100);
  pop();

  stateNumber = 4;
}

drawBedroom = function () {
  background(colorsRow3[2]);
  image(imgBg[5], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[5], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);

  // W
  text('Patio', wasdX+instructWH/8, wasdY-instructWH/3);
  // A
  text('Bathroom', wasdX-instructWH/1.5, wasdY);
  // S
  text('Hallway', wasdX-instructWH/8, wasdY+instructWH/2.8);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Bedroom", 100, 100);
  pop();

  stateNumber = 5;
}

drawPatio = function () {
  background(colorsRow3[1]);
  image(imgBg[6], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[6], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);

  // S
  text('Bedroom', wasdX-instructWH/8, wasdY+instructWH/2.8);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Patio", 100, 100);
  pop();

  stateNumber = 6;
}

drawMasterBath = function () {
  background(colorsRow3[3]);
  image(imgBg[7], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[3], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);

  // D
  text('Bedroom', wasdX+instructWH/1.25, wasdY+15);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Bathroom", 100, 100);
  pop();

  stateNumber = 7;
}

drawLoft = function () {
  background(colorsRow2[3]);
  image(imgBg[8], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  image(imgDeco[7], (width/2+(1920/imgRatio)/2)-100, height/8+(1080/imgRatio)/2, 150*1.5, 300*1.5);

  // Down Arrow
  text('2nd Floor', arrowX-instructWH/8, arrowY+instructWH/3);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Creativity Suite", 100, 100);
  pop();

  stateNumber = 8;
}

drawOutside = function () {
  background(colorsRow3[3]);
  image(imgBg[9], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
  drawControls();

  // W
  text('Enter', wasdX+instructWH/8, wasdY-instructWH/3);

  // Room Name
  push();
    textFont(fontMtHills);
    textSize(width/25);
    textAlign(LEFT);
    text("Exterior", 100, 100);
  pop();

  stateNumber = 9;
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
  stateFunctions[9] = drawOutside;


/*************************************************************************
// Custom functions
**************************************************************************/

function drawControls() {
   // Position the controls
    wasdX = width/6;
    wasdY = 5*(height/6);
    arrowX = 5*(width/6);
    arrowY = 5*(height/6);
    instructWH = width/6;

    image(imgWASD, wasdX, wasdY, instructWH, instructWH);
    image(imgARROWS, arrowX, arrowY, instructWH, instructWH);
}

function drawInstructMessage() {
  if (drawFunction != drawSplash && drawFunction != drawInstructions) {
    image(imgKeyI, width-60, 50, 150, 150);
    push();
    textSize(28);
    textAlign(RIGHT);
    text(instruct[3], width-100, 50);
    pop();
  }
}


/*************************************************************************
// Control / interaction functions
**************************************************************************/
// Navigate the states
function keyPressed() {

  if (drawFunction === drawLiving) {
    if (key === 'w') {
        drawFunction = drawKitchen;
    }
    if (key === 'a') {
        drawFunction = drawGarden;
    }
    if (key === 's') {
        drawFunction = drawOutside;
    }
  }
  else if (drawFunction === drawKitchen) {
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
  else if (drawFunction === drawGarden) {
      if (key === 'd') {
        drawFunction = drawLiving;
    }
  }
  else if (drawFunction === drawHallway) {
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
  else if (drawFunction === drawBedroom) {
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
  else if (drawFunction === drawPatio) {
    if (key === 's') {
        drawFunction = drawBedroom;
    }
  }
  else if (drawFunction === drawMainBath) {
    if (key === 'd') {
        drawFunction = drawKitchen;
    }
  }
  else if (drawFunction === drawMasterBath) {
    if (key === 'd') {
        drawFunction = drawBedroom;
    }
  }
  else if (drawFunction === drawLoft) {
    if (keyCode === DOWN_ARROW) {
        drawFunction = drawHallway;
    }
  }
  else if (drawFunction === drawOutside) {
    if (key === 'w') {
        drawFunction = drawLiving;
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
        drawFunction = drawLiving;
    }
}