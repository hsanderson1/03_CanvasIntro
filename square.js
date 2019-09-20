function InitializeSQUARE() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.scale(1,1);
  SQUARE = {
    x : 300,
    y : 150,
    rotation : 5,
    health : 3,
    positions : [
      {
        x : 0,
       	y : 5
      },
      {
        x : 8,
       	y : -1
      },
      {
        x : 0,
       	y : 0
      },
      {
        x : -3,
       	y : -0
      },
      {
        x : 14,
       	y : 2
      }
    ],
    latest : {
        x : SQUARE.x,
        y : SQUARE.y,
    },
    scale : 5,
    speed : 3,
    initialized : true
  };
}

// Rotate rotates a point around
// cx, cy   :   The central point
// x, y     :   The coordinates of point to be rotatedPoint
// angle    :   Angle in degrees of rotation
function Rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

// RotateAroundOrigin
// x, y     :   The coordinates of point to be rotatedPoint
// angle    :   Angle in degrees of rotation
function RotateAroundOrigin(x, y, angle) {
  return Rotate(0, 0, x, y, angle);
}

/**  RenderSQUARE
 *
 *  Renders all SQUARE points after adjusting them for the rotation and position
 *    in space
 */
function RenderSQUARE(context) {
  if (!SQUARE.initialized) {
    return;
  }

  // Move to the point where drawing will start
  var rotatedPoint = RotateAroundOrigin(
    SQUARE.positions[0].x,
    SQUARE.positions[0].y,
    SQUARE.rotation
  );
  context.moveTo(SQUARE.x + rotatedPoint[0],SQUARE.y +  rotatedPoint[1]);
  SQUARE.latest.x = SQUARE.x + rotatedPoint[0];
  SQUARE.latest.y = SQUARE.y + rotatedPoint[1];
  // Begin rendering the space ship points (rotating them each time)
  context.beginPath();
  for (var i = 0; i < SQUARE.positions.length; i++) {
    var rotatedPoint = RotateAroundOrigin(
      SQUARE.positions[i].x,
      SQUARE.positions[i].y,
      SQUARE.rotation
    );
    context.lineTo(
      SQUARE.x + (rotatedPoint[0] * SQUARE.scale),
      SQUARE.y + (rotatedPoint[1] * SQUARE.scale)
    );
  }
  context.lineWidth = 1;
  switch (SQUARE.health) {
    case 3:
      context.strokeStyle = 'green';
      break;
    case 2:
      context.strokeStyle = 'blue';
      break;
    case 1:
      context.strokeStyle = 'orange';
      break;
    case 0:
      context.strokeStyle = 'red';
      break;
    default:
      context.strokeStyle = 'white';
      break;
  }
  context.stroke();
}
