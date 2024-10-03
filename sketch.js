let shapes = []; // To store multiple shapes with different points and colors
let avoidanceRadius = 100; // Radius around the mouse for the avoidance effect
 
let waterAmount=0;
let stepsAmount=0;
let socialAmounts=0;
let sleepAmounts=0;


let water = waterAmount;
let steps = stepsAmount;
let social = socialAmounts
let sleep = sleepAmounts;

function setup() {
  // Get the container element by its ID
  let canvasContainer = document.getElementById('sketch-canvas');
  
  // Use the container's width and height for the canvas size
  let canvasWidth = canvasContainer.clientWidth;
  let canvasHeight = canvasContainer.clientHeight;

  // Create the canvas with the container's dimensions
  let canvas = createCanvas(canvasWidth, canvasHeight);

  // Apply the border-radius style to the canvas
  canvas.style('border-radius', '30px');

  // Attach the canvas to the container
  canvas.parent(canvasContainer);

  
}

function draw() {
  background(53,56,57);
  
  // Visualize the avoidance boundary around the mouse
  drawMouseBoundary();
  
  // Loop through all shapes and move and draw each shape
  for (let i = 0; i < shapes.length; i++) {
    moveAndDrawShape(shapes[i]);
  }
}

// Function to create a shape with `n` points and a specified color
function createShape(n, shapeColor) {
  let shape = {
    points: [],
    velocities: [],
    color: shapeColor // Assign a color to the shape
  };
  
  // Initialize points and velocities for the shape
  for (let i = 0; i < n; i++) {
    shape.points.push(createVector(random(width), random(height)));
    shape.velocities.push(createVector(random(-1, 1), random(-1, 1))); // Random velocities
  }
  
  return shape;
}

// Function to move points and draw the moving shape
function moveAndDrawShape(shape) {
  movePoints(shape);
  drawShape(shape);
}

// Function to move the points of a shape across the screen
function movePoints(shape) {
  for (let i = 0; i < shape.points.length; i++) {
    let point = shape.points[i];
    let velocity = shape.velocities[i];
    
    // Apply the normal movement
    point.add(velocity); 

    // Reverse velocity if the point hits canvas boundaries
    if (point.x > width || point.x < 0) {
      velocity.x *= -1;
    }
    if (point.y > height || point.y < 0) {
      velocity.y *= -1;
    }

    // Check if the point is within the avoidance radius of the mouse
    let distanceToMouse = dist(point.x, point.y, mouseX, mouseY);
    if (distanceToMouse < avoidanceRadius) {
      // Repel the point from the mouse by pushing it away
      let repelForce = createVector(point.x - mouseX, point.y - mouseY);
      repelForce.normalize();  // Normalize the vector to keep direction, not magnitude
      repelForce.mult(2);  // Strength of the repelling force (adjust for desired effect)

      // Apply the repelling force to the point's position
      point.add(repelForce);
    }
  }
}

// Function to draw the shape connecting the moving points
function drawShape(shape) {
  noFill();
  stroke(shape.color);  // Set the stroke to the shape's color
  strokeWeight(0.25);
  
  beginShape();
  for (let i = 0; i < shape.points.length; i++) {
    vertex(shape.points[i].x, shape.points[i].y); // Use each updated point as a vertex
    
    // Draw a circle at each point to make it more visible
    push();
    fill(shape.color);    // Fill the circle with the shape's color
    noStroke();           // No outline for the circle
    ellipse(shape.points[i].x, shape.points[i].y, 8, 8); // Draw a circle with radius 8 at each point
    pop();
  }
  endShape(CLOSE);
}

// Function to draw the boundary around the mouse
function drawMouseBoundary() {
  noStroke()
  noFill()
  ellipse(mouseX, mouseY, avoidanceRadius * 2); // Draw circle centered on mouse with diameter = 2 * avoidanceRadius
}

function updateSketch(waterVal, sleepVal, socialVal, stepsVal) {
  // Update the global variables
  waterAmount = waterVal;
  sleepAmount = sleepVal;
  socialAmounts = socialVal;
  stepsAmount = stepsVal;

  // Clear and regenerate shapes
  shapes = [];
  shapes.push(createShape(waterAmount, color(17, 8, 98)));
  shapes.push(createShape(sleepAmount, color(113, 5, 70)));
  shapes.push(createShape(socialAmounts, color(146, 36, 14)));
  shapes.push(createShape(stepsAmount, color(193, 152, 18)));
}

// Reset Sketch function
function resetSketch() {
  shapes = [];
  clear();
  background(37, 39, 41);
}

