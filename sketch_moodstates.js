/*************************************************************************
  Rooms of a House
          by Maj Jenkins
          Feb. 22, 2021

    Overview:
    

    ---------------------------------------------------------------------
    Notes: 
     (1) 
**************************************************************************/

/*************************************************************************
// Global variables
**************************************************************************/
// Variables of images, fonts, labels
var images = [];
var fonts = [];
var defaultFont;
var labels = ["cloudy", "UNKNOWABLE", "thinking about\nnear eastern vessel\nwith two feet\n(1000-800 BCE)", "OCEAN", "i do not want\nto do work\ni want to\ngo outside"];
var bgColors = ["#C3E0E5", "#1a1f1e", "#856350", "#274472", "#5885AF"]
var song = [];
let playButton;
let pauseButton;
var instruct = ["INSTRUCTIONS", "________", "Press [LEFT ARROW] and [RIGHT ARROW] to rotate moods", "Click [LMB] to play/pause the ambience", "Press [F] for fullscreen", "Press [S] to return to the first state", "Press [I] to pull up this instruction screen again", "________", "PRESS [ESC] OR CLICK ANYWHERE TO CONTINUE"]
var someguy;

var gTextOffset = 50;

// Variable that is a function 
var drawFunction;

// Beginning the state at 0
var stateNumber = 0;

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
  // The images, fonts, and music are all of pretty small sizes (images 
  // are 600px width and height, music clips are 1 minute or less, so
  // it should be OK to preload all the assets and not lag.)
  // Images
    images[0] = loadImage('assets/img/cloudy.png');
    images[1] = loadImage('assets/img/unknowable.png');
    images[2] = loadImage('assets/img/vessel.png');
    images[3] = loadImage('assets/img/ocean.png');
    images[4] = loadImage('assets/img/outside.png');
    images[5] = loadImage('assets/img/splash.png');
    someguy = loadImage('assets/img/some_guy.png');
  // Fonts
    fonts[0] = loadFont('assets/fonts/cloudlike.otf');
    fonts[1] = loadFont('assets/fonts/who_asks_satan.otf');
    fonts[2] = loadFont('assets/fonts/fragment_core.otf');
    fonts[3] = loadFont('assets/fonts/jd_wave.otf');
    fonts[4] = loadFont('assets/fonts/weknow_windows.otf');
    defaultFont = loadFont('assets/fonts/inconsolata.otf');
  // Music
    song[0] = loadSound('assets/sfx/wind.mp3');
    song[1] = loadSound('assets/sfx/hum.mp3');
    song[2] = loadSound('assets/sfx/clay.mp3');
    song[3] = loadSound('assets/sfx/ocean.mp3');
    song[4] = loadSound('assets/sfx/keyboard.mp3');
  // Play-pause Button
    playButton = loadImage('assets/play.png');
    pauseButton = loadImage('assets/pause.png');
}

/*************************************************************************
// Function setup
**************************************************************************/
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);
    textFont(defaultFont);

    // Set to splash screen for startup
    drawFunction = drawSplash;
}

/*************************************************************************
// Function draw
**************************************************************************/
function draw() {
    background('#B7CCD5');
    fill('#fff');
    textSize(width/35);
    noStroke();
    imageMode(CENTER);
    // noCursor();

    // Call the state machine function (a variable)
    drawFunction();

    // Play button based upon if the song is playing or not
    drawPlayButton();
}

/*************************************************************************
// Custom functions
**************************************************************************/
// Reminder that arrays begin at ZERO and not at ONE!

//-- drawOne() will draw the image at index 0 from the array
drawOne = function () {
    background(bgColors[0]);
    image(images[0], width/3, height/2 + gTextOffset);
    textFont(fonts[0]);
    text(labels[0], 3*(width/4), height-mouseY);
}

//-- drawTwo() will draw the image at index 1 from the array
drawTwo = function () {
    background(bgColors[1]);
    image(images[1], width/3, height/2 + gTextOffset);
    push();
    textSize(width/15);
    textFont(fonts[1]);
    text(labels[1], 3*(width/4), height-mouseY);
    pop();
}

//-- drawThree() will draw the image at index 2 from the array
drawThree = function () {
    background(bgColors[2]);
    image(images[2], width/3, height/2 + gTextOffset);
    textFont(fonts[2]);
    text(labels[2], 3*(width/4), height-mouseY);
}

//-- drawFour() will draw the image at index 3 from the array
drawFour = function () {
    background(bgColors[3]);
    image(images[3], width/3, height/2 + gTextOffset);
    textFont(fonts[3]);
    text(labels[3], 3*(width/4), height-mouseY);
}

//-- drawFive() will draw the image at index 4 from the array
drawFive = function () {
    background(bgColors[4]);
    image(images[4], width/3, height/2 + gTextOffset);
    textFont(fonts[4]);
    text(labels[4], 3*(width/4), height-mouseY);
}

//-- drawSplash() will draw the image at index 5 from the array
drawSplash = function() {
  background(bgColors[3]);
  image(images[5], width/2, height/2 - 20);
  text("CLICK ANYWHERE TO START", width/2, height - 20);
}

// Instructions state
drawInstructions = function() {
  background(bgColors[4]);
  // starting i at 0, as long as i is less than 9, add one to i
  // draw text calling from the instruct array, using the variable i to determine number in the array
  for (i=0; i < 9; i++) {
    textSize(30);
    text(instruct[i], width/2, height/3.5+(i*gTextOffset));
  }

// a fun little guy to keep you company in the instructions menu
  let guyPos = map(mouseX, 100, width+100, 0, 100, true);
  
  image(someguy, guyPos, 2*(height/3))
}

// Array of function-variables (cannot be called before preload because these functions have not yet been created)
  var imgFunctions = [drawOne, drawTwo, drawThree, drawFour, drawFive];


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
        // Stop the song that's playing
        song[stateNumber].stop();
    }

     // S for first state and reset song to first state
    if (key === 's') {
      // Stop the song that's playing
        song[stateNumber].stop();
        drawFunction = drawOne;
        stateNumber = 0;
        song[stateNumber].play();
    }

    // Escape key to exit instructions state
    if (key === 'Escape') {
        drawFunction = imgFunctions[stateNumber];
        // Play the song that's set to play
        song[stateNumber].play();
    }

    // Left arrow rotates states backwards
    if (keyCode === LEFT_ARROW) {
        // Stop the song playing
        song[stateNumber].stop();
        // Subtract one to the stateNumber
        if (stateNumber > -1) {
            stateNumber--;
            } 
        if (stateNumber < 0) {
            stateNumber = 4;  
            }
        //  Call the function
        drawFunction = imgFunctions[stateNumber];
        // Play appropriate song
        song[stateNumber].play();
    }

    // Right arrow rotates states forwards
    else if (keyCode === RIGHT_ARROW) {
        // Stop the song playing
        song[stateNumber].stop();
        // Add one to the stateNumber
        if (stateNumber < 5) {
            stateNumber++;
            } 
        if (stateNumber > 4) {
            stateNumber = 0;  
            }
        //  Call the function
        drawFunction = imgFunctions[stateNumber];
        // Play appropriate song
        song[stateNumber].play();
    }
}

// On a mouse click, play or pause the ambience
function mousePressed() {
  // If the splash state is not up, a mouse click pauses/plays ambience
  if (drawFunction != drawSplash) {
    if (song[stateNumber].isPlaying()) {
      song[stateNumber].stop();
    } 
    else {
      song[stateNumber].play();
    }
  }

  // If the splash or instruction states are up, a mouse click moves it along linearly
  if (drawFunction === drawSplash) {
      drawFunction = drawInstructions;
  }
    else if (drawFunction === drawInstructions) {
        drawFunction = imgFunctions[stateNumber];
    }
  }

// Depending on if the ambience is playing or not, draw the play/pause button at the upper lefthand corner
function drawPlayButton() {
  push();
  imageMode(CORNER);
  textSize(20);
  textFont(defaultFont);
  textAlign(CENTER);
  // When to draw the play/pause button: anytime but the splash and instructions state
  if (drawFunction != drawSplash && drawFunction != drawInstructions) {
    if (song[stateNumber].isPlaying()) {
      image(playButton, 20, 20, 50, 50);
      text("PLAYING", 50, 90);
    } 
    else {
      image(pauseButton, 20, 20, 50, 50);
      text("PAUSED", 50, 90);
    }
    textAlign(RIGHT);
    textSize(width/60);
    text('Press [I] to pull up the instructions', width-40, 40)
    pop();
  }
}