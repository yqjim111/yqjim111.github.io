function setup() {
  createCanvas(800, 800);
}

function draw() {
  WidthStrip = width / 60
  HeightStrip = height / 60
  RGBStrip = 255 / 60
  var h = hour();
  var m = minute();
  var s = second();
  R = 125;

  for (var i = 0; i < s; i++) {
    fill(R, 255 / 60 * m, RGBStrip * i, 10);
    rect(WidthStrip * i, 0, WidthStrip, height);
  }

  if (s === 0) {
    clear();
  }

  if (h === 12) {
    background(255/24*h, 255/24*h, 255/24*h);
  }

  for (var i = 0; i < m; i++) {
    noStroke();
    fill(255 / 60 * m, 125, RGBStrip * i, 10);
    rect(0, 800 - i * HeightStrip, width, HeightStrip);
  }

}
