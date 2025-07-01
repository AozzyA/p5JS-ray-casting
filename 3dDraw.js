function draw3DWalls() {
  updateRays(); // update ray list to know where to draw
  // console.log(player)
  // console.log(player);
  for (let i = 0; i < player.rayList.length; i++) {
    stroke(0); // resets stroke color before drawing each ray
    // console.log(player.rayList.distance)
    if (player.rayList[i].wallHit == "wall1") {
      // if ray hit wall1 then make it green. TODO give wall a "type" that can be used for unique wall colors and later used for textures
      stroke(color(100, 200, 100));
    }
    if (player.rayList[i].wallHit == "wall5") {
      // if ray hit wall1 then make it green. TODO give wall a "type" that can be used for unique wall colors and later used for textures
      stroke(color(200, 100, 100));
    }
    if (player.rayList[i].wallHit == "brick") {
      textured = true;
    }
    if (player.rayList[i].distance != null) {
      //
      placeholder = player.rayList[i].angle;
      lineHeight = (250 / player.rayList[i].distance) * 3; // set distance scale according to distance from wall. changing first number changes rate that wall gets bigger second number changes scale
      // distanceScale = screenHeight/2 - player.rayList[i].distance
      if (lineHeight > screenHeight / 2) {
        // if too close then set distanceScale to be inside of the viewbox
        lineHeight = screenHeight / 2;
      }
      if (lineHeight >= 0 && textured == false) {
        strokeWeight(2);
        line(
          i + (500 - screenWidth) / 2,
          250 - lineHeight,
          i + (500 - screenWidth) / 2,
          250 + lineHeight
        );
        strokeWeight(1);
        textured = false;
      }
      if (textured == true) {
        stroke(200);
        strokeWeight(2);
        // console.log(player.rayList[i].wallX)
        if (i % 5 == 0) {
          for (let j = 0; j < lineHeight; j += 5) {
            
            // fill(brick.get(player.rayList[i].wallX, j*(screenHeight/lineHeight)))
            // stroke(brick.get(player.rayList[i].wallX, j*(screenHeight/lineHeight)))
            if (j % 10 == 0) {
              stroke(100);
              fill(100)
            } else {
              stroke(200);
              fill(200)
            }
            rect(i, (j*2+(250-lineHeight)), 5, 10)
            // point(i, j*2+(250-lineHeight))
            // point(i, j*2+(250-lineHeight+1))
            // point(i, j*2+(250-lineHeight+2))
            // point(i, j*2+(250-lineHeight+3))
            // point(i, j*2+(250-lineHeight+4))
            // point(i, j*2+(250-lineHeight+5))
            // stroke(0)
          }
        }
        stroke(0);
        textured = false;
      }
    }
    // console.log(player.rayList[i].wallHit)
  }
  stroke(0);
  textured = false;
}

function drawFloor() {
  // draws a dark gray rectangle on the bottom half of the
  // screen to look like a floor then sets fill color back to white
  strokeWeight(0);
  fill(100);
  rect(250 - screenWidth / 2, 250, screenWidth, screenHeight / 2);
  strokeWeight(1);
  fill(255);
}

function drawScreenBorders() {
  // TODO make screen borders adjust to the height,
  // fov, and number of rays
  line(
    250 - screenWidth / 2,
    250 - screenHeight / 2,
    250 + screenWidth / 2,
    250 - screenHeight / 2
  );
  line(
    250 + screenWidth / 2,
    250 - screenHeight / 2,
    250 + screenWidth / 2,
    250 + screenHeight / 2
  );
  line(
    250 - screenWidth / 2,
    250 + screenHeight / 2,
    250 + screenWidth / 2,
    250 + screenHeight / 2
  );
  line(
    250 - screenWidth / 2,
    250 + screenHeight / 2,
    250 - screenWidth / 2,
    250 - screenHeight / 2
  );
}
