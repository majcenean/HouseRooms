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

// Variables of fonts
var fontMtHills;
var fontCoco;

// String arrays
var colorsRow1 = ["#FADEA8", "#EBB07A", "#E8CFBF", "#D1CFB2"];
var colorsRow2 = ["#E3B585", "#D98A70", "#B59E8F", "#6E4538"];
var colorsRow3 = ["#918F6B", "#A1D1C2", "#9CB5C9", "#4F99B8"];
var colorsRow4 = ["#BFCCB0", "#7D7A66", "#C9CCCF", "#969496"];
var instruct = ["INSTRUCTIONS", "________", "Press [LEFT ARROW] and [RIGHT ARROW] to rotate moods", "Click [LMB] to play/pause the ambience", "Press [F] for fullscreen", "Press [S] to return to the first state", "Press [I] to pull up this instruction screen again", "________", "PRESS [ESC] OR CLICK ANYWHERE TO CONTINUE"]

// Variable that is a function 
var drawFunction;

// Beginning the state at 0
var stateNumber = 2;

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
  // Images
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
    drawFunction = stateFunctions[0];
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

drawSplash = function() {
  background(colorsRow1[0]);
  image(splash_img, width/2, height/2, 1920/imgRatio, 1080/imgRatio);

  push();
    textFont(fontMtHills);
    textSize(width/20);
    text("My House", width/3, height/3);
  pop();

  text("CLICK TO ENTER", width/2.7, 1.6*(height/4));

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
  image(imgBg[7], width/2, height/2, 1920/imgRatio, 1080/imgRatio);
}

// Array of function-variables (cannot be called before preload because these functions have not yet been created)
  var stateFunctions = [drawSplash, drawInstructions, drawLiving, drawKitchen, drawGarden, drawMainBath, drawHallway, drawBedroom, drawPatio, drawMasterBath, drawLoft];


/*************************************************************************
// Custom functions
**************************************************************************/



/*************************************************************************
// Control / interaction functions
**************************************************************************/
// Navigate the states
function keyPressed() {
    // Fullscreen toggle
    if (key === 'f') {
        let fs = fullscreen();
        fullscreen(!fs);
    }

    // I for instructions state
    if (key === 'i') {
        drawFunction = drawInstructions;
    }

    // Escape key to exit instructions state
    if (key === 'Escape') {
      // if stateNumber = drawInstructions {
      //   drawFunction = stateFunctions[stateNumber];
      // }
    }

    // // Left arrow rotates states backwards
    // if (keyCode === LEFT_ARROW) {

    // }

    // // Right arrow rotates states forwards
    // else if (keyCode === RIGHT_ARROW) {

    // }


  // Living room
  if (drawFunction = drawLiving) {
    if (key === 'w') {
      drawFunction = drawKitchen;
    }
    if (key === 'a') {
      drawFunction = drawGarden;
    }
  }

  // Garden
  if (stateFunctions = drawGarden) {
    if (key === 'd') {
      drawFunction = drawLiving;
    }
  }

  // // Kitchen
  // if (drawFunction = drawKitchen) {
  //   if (key === 's') {
  //     drawFunction = drawLiving;
  //   }
  //   if (key === 'w') {
  //     drawFunction = drawHallway;
  //   }
  //   if (key === 'a') {
  //     drawFunction = drawMainBath;
  //   }
  // }




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