class Player {
  //player class
  constructor(
    x,
    y,
    farPointX,
    farPointY,
    cameraPlaneX1,
    cameraPlaneY1,
    rayList,
    speed,
    rotateSpeed,
    angle
  ) {
    //constructs stuff
    this.farPointX = farPointX; // far point is used for the line intersect formula. It rotates as the player rotates
    this.farPointY = farPointY; // ^
    this.x = x; // sets x y
    this.y = y; // ^
    this.rayList = rayList; // sets the list of Ray objects which is used for sight
    this.speed = speed;
    this.rotateSpeed = rotateSpeed;
    this.angle = angle;
    // var placeHolderCameraPlane = rotatePoint(farPointX, farPointY, x, y, 90)
    this.cameraPlaneX1 = cameraPlaneX1;
    this.cameraPlaneY1 = cameraPlaneY1;
  }
  movement() {
    var rotatePlayer; // placeholder to store x and y of the new far out point
    var isDiagonal; // gets set to 0.58578643763 to fix diagonal speed bug
    var placeHolderCameraPlane;
    
    placeHolderCameraPlane = rotatePoint(
        this.farPointX,
        this.farPointY,
        this.x,
        this.y,
        90
      );
    
    this.cameraPlaneX1 = placeHolderCameraPlane[0];
    this.cameraPlaneY1 = placeHolderCameraPlane[1];
    // line(this.cameraPlaneX1 / scaleMinimap, this.cameraPlaneY1 / scaleMinimap, this.x / scaleMinimap, this.y / scaleMinimap)
    
    if (keyIsDown(87)) {
      // move forward
      this.x -= this.speed * cos(this.angle);
      this.y -= this.speed * sin(this.angle);
      this.farPointX -= this.speed * cos(this.angle);
      this.farPointY -= this.speed * sin(this.angle);
    }
    if (keyIsDown(83)) {
      // move backwards
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
      this.farPointX += this.speed * cos(this.angle);
      this.farPointY += this.speed * sin(this.angle);
    }
    if (keyIsDown(65)) {
      // move left
      this.x += this.speed * cos(this.angle + 90);
      this.y += this.speed * sin(this.angle + 90);
      this.farPointX += this.speed * cos(this.angle + 90);
      this.farPointY += this.speed * sin(this.angle + 90);
    }
    if (keyIsDown(68)) {
      // move right
      this.x += this.speed * cos(this.angle - 90);
      this.y += this.speed * sin(this.angle - 90);
      this.farPointX += this.speed * cos(this.angle - 90);
      this.farPointY += this.speed * sin(this.angle - 90);
    }

    if (keyIsDown(39)) {
      // rotate this right
      rotatePlayer = rotatePoint(
        this.farPointX,
        this.farPointY,
        this.x,
        this.y,
        this.rotateSpeed
      );
      this.farPointX = rotatePlayer[0];
      this.farPointY = rotatePlayer[1];
      this.angle += this.rotateSpeed;
      // this.cameraPlaneX = placeHolderCameraPlane[0];
      // this.cameraPlaneY = placeHolderCameraPlane[1];
    }

    if (keyIsDown(37)) {
      // rotate this left
      rotatePlayer = rotatePoint(
        this.farPointX,
        this.farPointY,
        this.x,
        this.y,
        -this.rotateSpeed
      );
      this.farPointX = rotatePlayer[0];
      this.farPointY = rotatePlayer[1];
      this.angle -= this.rotateSpeed;
      // placeHolderCameraPlane = rotatePoint(
      //   this.farPointX,
      //   this.farPointY,
      //   this.x,
      //   this.y,
      //   90
      // );
      // this.cameraPlaneX = placeHolderCameraPlane[0];
      // this.cameraPlaneY = placeHolderCameraPlane[1];
    }

    if (this.angle >= 360) {
      // if angle completes full circle then reset to 0
      this.angle -= 360;
    }
    // console.log(this.angle)
    if (this.angle < 0) {
      // if angle goes negative add 360 so it's positive
      this.angle += 360;
    }
    // this.cameraPlaneX = placeHolderCameraPlane[0];
    // this.cameraPlaneY = placeHolderCameraPlane[1];
  }
}