var scaleMinimap = 0.25; // bigger number means smaller minimap
var minimapOffset = -3;
var rayListSetup = []; // empty list that gets added to when creating rays
var screenWidth = 500;
var screenHeight = 500;
var fieldOfView = 90;
var displayScreen = true;
var howManyRaysDrawn = 10; //draws every n ray
var toggleSprint = false;
var textured = false;
var textureList = []

function preload() {
  brick = loadImage("brick.png")
}

function setup() {
  angleMode(DEGREES);
  //sets stuff up
  // screenWidth = 270;
  // fieldOfView = 90
  DIST = 50;
  SCREEN_HALFLEN = DIST * tan(fieldOfView / 2);
  SEG_LEN = SCREEN_HALFLEN / (screenWidth / 2);
  console.log("reihfjwnoijfreopiojds", tan(45));
  console.log(angleFromThreePoints([0, 0], [10, 0], [0, 10]), "TEST");
  for (let i = 0; i <= screenWidth; i++) {
    //loops and creates Rays for each pixel

    append(
      // rays get added to rayListSetup which is then put inside the player
      rayListSetup, // the angle of the ray = following equation.
      // this should make it possible to change fov and number of rays easily
      // everything else is null because distance, type, and wallHit are set when
      // rays collide with a wall
      new Ray(
        null,
        angleFromThreePoints(
          [250, 250],
          [250, 0],
          [i * ((250 + tan(fieldOfView / 2) * 250) / screenWidth) + (250 - tan(fieldOfView/2)*250)/2,
          0]
        ),
        // (i * (fieldOfView/screenWidth)) - fieldOfView/2,
        null,
        null
      )
    );
  }
  // angleMode(RADIANS)
  SCREEN_HALFLEN = 50 * tan(fieldOfView / 2);
  console.log(SCREEN_HALFLEN);
  SEG_LEN = SCREEN_HALFLEN / (screenWidth / 2);
  console.log(SEG_LEN);
  console.log(atan((SEG_LEN * 97 - SCREEN_HALFLEN) / 50));
  console.log(rayListSetup); // testing rayListSetup
  createCanvas(500, 500); //canvas size
  // angleMode(DEGREES); // sets angles to measure in degrees
  player = new Player(250, 250, 250, -250, 250, -250, rayListSetup, 1, 2, 90); //creates player object

  // player = new Player(231, 234, 532, -164, 631, 535, rayListSetup, 0.5, 2, 127); //creates player object TESTS WALL WARPING LIKE ~ AT 90° FOV

  // player = new Player(236.2, 234.6, 416.1, -229.9, 700.8, 414.5, rayListSetup, 0.5, 2, 125); //creates player object TESTS WALL WARPING LIKE ~ AT 120° FOV

  // player = new Player(231, 224, 730, 216, 239, 723, rayListSetup, 0.5, 2, 180); //creates player object TESTS FLAT WALL LOOKING CURVED

  // player = new Player(231.4, 231.6, 582.6, 584.8, -121.7, 582.7, rayListSetup, 0.5, 2, 239); //creates player object TESTS WALL WARPING WHEN SUBTRACTING

  wall1 = new Wall(230, 230, 270, 230, "wall1"); // creates test walls
  wall2 = new Wall(270, 240, 270, 270, "wall2");
  wall3 = new Wall(270, 270, 230, 270, "wall3");
  wall4 = new Wall(230, 270, 230, 230, "wall4");
  wall5 = new Wall(200, 190, 190, 2000, "wall5");
  wall6 = new Wall(60, 60, 40, 40, "wall5");
  wall7 = new Wall(250, 250, 250, 251, "wall5");
  wall8 = new Wall(280, 220, 280, 230, "brick");

  // wall1 = new Wall(100, 100, 400, 100, "wall1"); // creates test walls
  // wall2 = new Wall(400, 400, 400, 120, "wall2");
  // wall3 = new Wall(400, 400, 100, 400, "wall3");
  // wall4 = new Wall(100, 400, 100, 100, "wall4");
  // wall5 = new Wall(200, 190, 190, 2000, "wall5");
  // wall6 = new Wall(260, 260, 240, 240, "wall5");
  // console.log(rayIntersect(player, wall1)); // test for rayintersect function
  // rotatePoint(0, 100, 250, 250, 5); // test for rotateFunction
  // console.log(cameraDistance(0, 0, 6, 6, 45)); // test distance function
  // console.log(distance(0, 0, 6, 6));
  wallList = [wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8]; // creates a list of all walls. TODO add some form of level editor that saves wall lists to a file that can easily be loaded
}

function draw() {
  //draws stuff
  frameRate(30);
//   console.log(frameRate())
  // if (frameRate() < 20) {
  //   console.log("FUCK");
  // }
  // if (frameRate < 10) {
  //   console.log("super FUCK");
  // }
  background(220);

  player.movement(); // move player once per frame
  if (displayScreen == true) {
    drawFloor(); // draw 3d objects including floor and borders
    draw3DWalls();
    drawScreenBorders();
  } else {
    drawMinimap(); // draw minimap
    drawIntersection();
    drawAllRays();
  }
  textSize(20)
  fill(0)
  stroke(0)
  strokeWeight(1)
  text(round(frameRate()), 15, 20)
}

function keyPressed() {
  if (key == "c") {
    if (displayScreen == true) {
      displayScreen = false;
    } else {
      displayScreen = true;
    }
  }
  if (key == "v") {
    console.log(
      player.x,
      player.y,
      player.farPointX,
      player.farPointY,
      player.cameraPlaneX1,
      player.cameraPlaneY1,
      "rayListSetup",
      player.speed,
      player.rotateSpeed,
      player.angle
    );
  }
  if (key == "x") {
    console.log(
      "///////////////////////////////////////////////////////////////////"
    );
    for (i = 0; i < player.rayList.length; i += howManyRaysDrawn) {
      console.log(
        "|  I:",
        i,
        "  Cd: ",
        round(player.rayList[i].distance, 2),
        "  θ: ",
        round(player.rayList[i].angle, 2),
        "  D: ",
        round(
          player.rayList[i].distance / sin(90 - abs(player.rayList[i].angle)),
          2
        )
      );
    }
  }
  if (key == "r") {
    if (toggleSprint == false) {
      toggleSprint = true;
      player.speed = 5;
      player.rotateSpeed = 5;
    } else {
      toggleSprint = false;
      player.speed = 0.5;
      player.rotateSpeed = 2;
    }
  }
}
