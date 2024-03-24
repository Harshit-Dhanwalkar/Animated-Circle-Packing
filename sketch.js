
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
      this.r += 0.5;
    }
  }
  
  edges() {
    return (this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0);
  }
  
  show() {
    // fill(this.color); // Set fill color 
    noFill(); // Remove fill color
    stroke(this.color); // Set border color to white
    strokeWeight(1); // Set border thickness
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
  createCanvas(700, 700);
}


function draw() {
  background(0, 0, 0);

  frameRate(20); // Slow down the animation
  
  let newC = newCircle();
  if (newC != null) {
    circles.push(newC);
  }

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    
    if (c.edges()) {
      c.growing = false;
    }
    c.show();
    c.grow();
  }
}
