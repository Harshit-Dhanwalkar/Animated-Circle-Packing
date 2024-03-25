class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    // this.color = [255, 255, 255]; // White color
    this.color = [random(255), random(255), random(255)]; // RGB color
    this.growing = true;
  }
  
  grow() {
    if (this.growing) {
      this.r += 0.5;  // rate at which circle radius grows
      if (this.edges()) {
        this.growing = false;
      } else {
        for (let other of circles) {
          if (this != other) {
            let d = dist(this.x, this.y, other.x, other.y);
            if (d - 2 < this.r + other.r) {
              this.growing = false;
              break;
            }
          }
        }
      }
    }
  }
  
  edges() {
    return (this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0);
  }
  
  show() {
    // fill(this.color); // Set fill color 
    noFill(); // Remove fill color
    stroke(this.color); // Set border color to white
    strokeWeight(1.5); // Set border thickness
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

function newCircle() {
  let x = random(width);
  let y = random(height);

  let valid = true;
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let d = dist(x, y, c.x, c.y);
    if (d < c.r) {
      valid = false;
      break;
    }
  }


  if (valid) {
    return new Circle(x, y, 0);
  }
  else {
    return null;
  }
}

let circles = [];

function setup() {
  createCanvas(1900, 1000);
}


function draw() {
  background(0, 0, 0);

  frameRate(50); // Slow down the animation
  
  let newC = newCircle();  

  let total = 10000;  // Number of circles to be drawn
  let count = 0; // Number of circles drawn
  let attempts = 0; // Number of attempts to draw a circle
  if (circles.length < total) {
    if (newC != null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 100) {
      noLoop();
      console.log("Finished");
      }
  }

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    c.grow();          
    c.show();
    
    }
}
