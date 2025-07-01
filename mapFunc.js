function drawMinimap() {
  // calls all minimap draw functions
  drawPlayerMap();
  drawWallMap();
  // drawIntersection();
}

function drawPlayerMap() {
  circle(
    player.x / scaleMinimap + 250 * minimapOffset,
    player.y / scaleMinimap + 250 * minimapOffset,
    5
  ); // draws player dot
  circle(
    player.farPointX / scaleMinimap + 250 * minimapOffset,
    player.farPointY / scaleMinimap + 250 * minimapOffset,
    3
  ); // draws player far point
  stroke(color(0, 100, 0))
  drawLeftSightline = rotatePoint(
    player.farPointX,
    player.farPointY,
    player.x,
    player.y,
    -fieldOfView / 2
  );
  drawRightSightline = rotatePoint(
    player.farPointX,
    player.farPointY,
    player.x,
    player.y,
    fieldOfView / 2
  );

  line(
    // draws player sight line which is the line from player position
    // to player.farpoint position
    player.x / scaleMinimap + 250 * minimapOffset,
    player.y / scaleMinimap + 250 * minimapOffset,
    drawLeftSightline[0] / scaleMinimap + 250 * minimapOffset,
    drawLeftSightline[1] / scaleMinimap + 250 * minimapOffset
  );

  line(
    // draws player sight line which is the line from player position
    // to player.farpoint position
    player.x / scaleMinimap + 250 * minimapOffset,
    player.y / scaleMinimap + 250 * minimapOffset,
    drawRightSightline[0] / scaleMinimap + 250 * minimapOffset,
    drawRightSightline[1] / scaleMinimap + 250 * minimapOffset
  );

  drawCameraPlane1 = rotatePoint(
    player.farPointX,
    player.farPointY,
    player.x,
    player.y,
    -90
  );
  drawCameraPlane2 = rotatePoint(
    player.farPointX,
    player.farPointY,
    player.x,
    player.y,
    90
  );
  stroke(color(200, 100, 100));
  line(
    drawCameraPlane1[0] / scaleMinimap + 250 * minimapOffset,
    drawCameraPlane1[1] / scaleMinimap + 250 * minimapOffset,
    drawCameraPlane2[0] / scaleMinimap + 250 * minimapOffset,
    drawCameraPlane2[1] / scaleMinimap + 250 * minimapOffset
  );
  stroke(color(0))
}

function drawWallMap() {
  // loop through all walls and draws them on the minimap scaled by scaleMinimap
  for (let i = 0; i < wallList.length; i += 1) {
    line(
      wallList[i].x1 / scaleMinimap + 250 * minimapOffset,
      wallList[i].y1 / scaleMinimap + 250 * minimapOffset,
      wallList[i].x2 / scaleMinimap + 250 * minimapOffset,
      wallList[i].y2 / scaleMinimap + 250 * minimapOffset
    );
  }
}

function drawIntersection() {
  // loops through every intersection between all player rays all walls
  // and draws a dot where they intersect
  for (let i = 0; i < wallList.length; i++) {
    // loop through wall list
    for (let j = 0; j < player.rayList.length; j += howManyRaysDrawn) {
      // loop through ray list
      intersectPoint = rayIntersect(
        // set temp var for the intersect point
        player,
        wallList[i],
        player.rayList[j].angle
      );
      circle(
        // draws the circle at intersectPoint scaled by scaleMinimap
        intersectPoint[0] / scaleMinimap + 250 * minimapOffset,
        intersectPoint[1] / scaleMinimap + 250 * minimapOffset,
        3
      );
    }
  }
}

function drawAllRays() {
  for (let i = 0; i < player.rayList.length; i += howManyRaysDrawn) {
    drawRay = rotatePoint(
      player.farPointX,
      player.farPointY,
      player.x,
      player.y,
      player.rayList[i].angle
    );
    line(
      player.x / scaleMinimap + 250 * minimapOffset,
      player.y / scaleMinimap + 250 * minimapOffset,
      drawRay[0] / scaleMinimap + 250 * minimapOffset,
      drawRay[1] / scaleMinimap + 250 * minimapOffset
    );
  }
}
