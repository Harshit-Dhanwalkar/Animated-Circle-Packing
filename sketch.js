
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


let circles = [];

function setup() {
  createCanvas(900, 900);
}


function draw() {
  background(0, 0, 0);

  frameRate(10); // Slow down the animation
  let x = random(width);
  let y = random(height);
  let circle = new Circle(x, y, 0); // Start with a radius of 0
  circles.push(circle);

  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    
    if (c.edges()) {
      c.growing = false;
    }
    c.show();
    c.grow();
  }
}
