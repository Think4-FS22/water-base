let img;

let p;
let v;
let step = 5;
let samples = 10;

let n = 10000;
let drops = [];

function preload() {
  img = loadImage("heightmap.png");
}

function setup() {
  let ratio = img.width / img.height;
  createCanvas(1100, 1100 / ratio);

  console.log(img.width, img.height);

  for (let i = 0; i < n; i++) {
    let d = new Drop(random(0, width), random(0, height));
    drops.push(d);
  }

  background(250);
  angleMode(DEGREES);
  // image(img, 0, 0, width, height);
}

function draw() {
  for (let i = 0; i < drops.length; i++) {
    drops[i].update();
    drops[i].display();
  }
}

// function mouseClicked() {
//   console.log("mouseClicked");
//   p.set(mouseX, mouseY);
// }

class Drop {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.prevPos = this.position.copy();
    this.velocity = createVector(0, 3);
  }

  update() {
    let samples = 10;
    let theta = 360 / samples;
    let minVal = 1000;

    let minPos = null;
    for (let i = 0; i < samples; i++) {
      let p2 = p5.Vector.add(this.position, this.velocity);
      let lookupX = map(p2.x, 0, width, 0, img.width);
      let lookupY = map(p2.y, 0, height, 0, img.height);
      let col = img.get(lookupX, lookupY);
      let r = red(col);

      if (r < minVal) {
        minVal = r;
        minPos = p2;
      }
      this.velocity.rotate(theta);
    }
    this.prevPos = this.position.copy();
    this.position = minPos;
  }

  display() {
    stroke(0, 0, 0, 100);
    line(this.position.x, this.position.y, this.prevPos.x, this.prevPos.y);
  }
}
