let img;

function preload() {
  img = loadImage("heightmap.png");
}

function setup() {
  let ratio = img.width / img.height;
  createCanvas(1100, 1100 / ratio);

  console.log(img.width, img.height);
}

function draw() {
  background(250);
}
