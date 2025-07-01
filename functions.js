function rayIntersect(player, wall, rayAngle) {
  // figures out where wall intersects player sight ray
  // console.log(wall, rayAngle)
  newPoint = rotatePoint(
    player.farPointX,
    player.farPointY,
    player.x,
    player.y,
    rayAngle
  ); //rotate ray relative to player by the angle. This is what creates a field of view instead of just 1 line

  x1 = player.x; // makes wall/player input variables into easy for stolen formula
  y1 = player.y; // ^
  x2 = newPoint[0]; // ^
  y2 = newPoint[1]; // ^
  x3 = wall.x1; // ^
  y3 = wall.y1; // ^
  x4 = wall.x2; // ^
  y4 = wall.y2; // ^


  a =
    ((x4 - x3) * (y3 - y1) - (y4 - y3) * (x3 - x1)) /
    ((x4 - x3) * (y2 - y1) - (y4 - y3) * (x2 - x1)); // No fucking clue how this works i just stole this from a video

  // b =
  // ((x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1)) /
  // ((x4 - x3) * (y2 - y1) - (y4 - y3) * (x2 - x1)); // ^ I don't know if I need b but I'll leave it because I don't understand how this works

  intersectX = x1 + a * (x2 - x1); // get the X point of the intersect
  intersectY = y1 + a * (y2 - y1); // get the Y point of the intersect

  if (intersect([x1, y1], [x2, y2], [x3, y3], [x4, y4])) {
    // if intersect point is on line then return intersection point;
    return [intersectX, intersectY];
  } else {
    // otherwise don't
    return [null, null];
  }
}

function ccw(A, B, C) {
  // intersect code stolen from stack overflow
  return (C[1] - A[1]) * (B[0] - A[0]) > (B[1] - A[1]) * (C[0] - A[0]);
}
function intersect(A, B, C, D) {
  // ^
  return ccw(A, C, D) != ccw(B, C, D) && ccw(A, B, C) != ccw(A, B, D);
}

function rotatePoint(
  movingPointX,
  movingPointY,
  newOriginX,
  newOriginY,
  angle
) {
  // rotate point around any other point by any angle
  angle = angle;
  newPointX = movingPointX - newOriginX; // transforms the point being rotated
  newPointY = movingPointY - newOriginY; // so the point is around the origin
  return [
    // return the rotated point math stolen from rotating point calculator
    newPointX * cos(angle) - newPointY * sin(angle) + newOriginX,
    newPointX * sin(angle) + newPointY * cos(angle) + newOriginY,
  ];
}

function distance(x1, y1, x2, y2) {
  // gets distance between two points if angle is here then remove it
  return sqrt(sq(x2 - x1) + sq(y2 - y1));
}

function cameraDistance(x1, y1, x2, y2, angle) {
  return distance(x1, y1, x2, y2) * cos(abs(angle));

  // return (
  //   abs((y2 - y1) * x3 - (x2 - x1) * y3 + x2 * y1 - y2 * x1) /
  //   sqrt(sq(y2 - y1) + sq(x2 - x1))
  // );
}

function updateRays() {
  // update ray info
  for (let i = 0; i < player.rayList.length; i++) {
    // reset distance before doing anything
    player.rayList[i].distance = null;
    player.rayList[i].wallX = null
  }
  for (let i = 0; i < wallList.length; i++) {
    // loop through wall list
    // console.log(wallList[i], i, "TIJODOSkld")
    for (let j = 0; j < player.rayList.length; j++) {
      // loop through ray list
      intersectPoint = rayIntersect(
        player,
        wallList[i],
        player.rayList[j].angle
      ); // get ray intersect and wall intersect point
      // console.log(player.x, player.y, intersectPoint[0], intersectPoint[1])
      if (
        (cameraDistance(
          player.x,
          player.y,
          // player.cameraPlaneX1,
          // player.cameraPlaneY1,
          intersectPoint[0],
          intersectPoint[1],
          player.rayList[j].angle
        ) < player.rayList[j].distance ||
          player.rayList[j].distance == null) &&
        intersectPoint[0] != null
      ) {
        // only set distance if new distance is less than old so it only has the closest wall for distance and if the point intersects
        player.rayList[j].distance = cameraDistance(
          // set distance to found distance
          player.x,
          player.y,
          // player.cameraPlaneX1,
          // player.cameraPlaneY1,
          intersectPoint[0],
          intersectPoint[1],
          player.rayList[j].angle
        ); // * (player.angle * .00005); //uncomment this for really weird graphics
        // console.log(player.rayList[j].distance)
        // player.rayList[j].type = this will maybe later be used for texturing
        player.rayList[j].wallHit = wallList[i].name;
        if (wallList[i].name == "brick") {
        // player.rayList[j].spriteSlice = wallList[i].spriteSliceList[round(distance(wallList[i].x1, wallList[i].y1, intersectPoint[0], intersectPoint[1]))]
          // console.log("distance", distance(intersectPoint[0], intersectPoint[1], wallList[i].x1, wallList[i].y1))
          player.rayList[j].wallX = distance(intersectPoint[0], intersectPoint[1], wallList[i].x1, wallList[i].y1) * 50
        }
      }
    }
  }
}


function angleFromThreePoints(p1, p2, p3)  {
  return(atan2(p3[1] - p1[1], p3[0] - p1[0]) - atan2(p2[1] - p1[1], p2[0] - p1[0]));
}