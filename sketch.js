let gridSize = 50;
let canvasSize = 800;

let yellow = '#ffd800'
let red = '#A2362A'
let gray = '#DADBD5'
let blue = '#4B66C1'

function setup() {
  createCanvas(canvasSize, canvasSize);
  noLoop(); // Ensure draw() is called only once
}

function draw() {
  background(220);
  drawGrid();
  drawLines();
}

// 画方格线
function drawGrid() {
  stroke(0);
  strokeWeight(0.5);
  for (let i = 0; i <= gridSize; i++) {
    let pos = i * (canvasSize / gridSize);
    line(pos, 0, pos, canvasSize);
    line(0, pos, canvasSize, pos);
  }
}

// 根据线段取坐标
function getIntersectingGrids(x1, y1, x2, y2) {
  let intersectingGrids = [];
  let x1Idx = x1;
  let y1Idx = y1;
  let x2Idx = x2;
  let y2Idx = y2;

  let dx = Math.abs(x2Idx - x1Idx);
  let dy = Math.abs(y2Idx - y1Idx);
  let sx = x1Idx < x2Idx ? 1 : -1;
  let sy = y1Idx < y2Idx ? 1 : -1;
  let err = dx - dy;

  while (true) {
    intersectingGrids.push(`${x1Idx},${y1Idx}`);
    if (x1Idx === x2Idx && y1Idx === y2Idx) break;
    let e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x1Idx += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1Idx += sy;
    }
  }

  return intersectingGrids;
}

// 填格子
function fillGrid(x, y, color) {
  fill(color);
  noStroke();
  rect(x * (canvasSize / gridSize), y * (canvasSize / gridSize), canvasSize / gridSize, canvasSize / gridSize);
}

// 画线
function drawLine(x1, y1, x2, y2, color) {
  let intersectingGrids = getIntersectingGrids(x1, y1, x2, y2);
  for (let coord of intersectingGrids) {
    let [x, y] = coord.split(',').map(Number);
    fillGrid(x, y, color);
  }

  // 辅助线
  // stroke(0);
  // strokeWeight(2);
  // line(x1, y1, x2, y2);
}

function drawTestLine() {
  let startX = 0;
  let startY = 0;
  let endX = 400;
  let endY = 600;

  drawLine(startX, startY, endX, endY, yellow);
}

function drawLines(){
  // whole lines
  let x1s = [3,6,11,26,42,48]
  for (let i = 0; i < x1s.length; i++) {
    drawLine(x1s[i], 0, x1s[i], 50, yellow);
  }
  let y1s = [1,8,17,21,27,30,42,47,]
  for (let i = 0; i < y1s.length; i++) {
    drawLine(0, y1s[i], 50, y1s[i], yellow);
  }
  // vertical partial lines
  // let vps = [1,28,31,44,46];
  let vps = [
    [1,0,1,y1s[2]], 
    [28,0,28,y1s[2]], 
    [28,y1s[3],28,49], 
    [31, y1s[3], 31, y1s[5]],
    [44, y1s[2], 44, 0],
    [46, y1s[3], 46, y1s[1]],
    [46,0,46,4],
    [46,y1s[5],46,40]
  ];
  for (let vp of vps) {
    drawLine(vp[0], vp[1], vp[2], vp[3],yellow);
  }

  let hps = [
    [0,44,3,44],
    [0,38,3,38],
    [0,33,3,33],
    [3,35,x1s[3]+2,35],
    [42,40,48,40]
  ];
  for (let hp of hps) {
    drawLine(hp[0], hp[1], hp[2], hp[3],yellow);
  }



  function drawRectangle(x1, y1, x2, y2, color) {
    fill(color);
    noStroke();
    let width = (x2 - x1) * (canvasSize / gridSize);
    let height = (y2 - y1) * (canvasSize / gridSize);
    rect(x1 * (canvasSize / gridSize), y1 * (canvasSize / gridSize), width, height);
  }
  
  let rectangles = [
    [7, 3, 11, 5, yellow],
    [8, 2, 10, 8, red], 
    [8, 5, 10, 6, gray], // [左上角x, 左上角y, 右下角x, 右下角y, 颜色]
    [13, 2, 17, 7, red],
    [14, 4, 16, 6, gray],
    [13, 7, 17, 8, gray],
    [45, 5, 48, 7, blue],
    [4, 10, 7, 12, blue],
    [7, 13, 11, 16, yellow],
    [8, 14, 10, 15, gray],
    [32, 9, 37, 17, blue],
    [32, 11, 37, 15, red],
    [33, 12, 36, 14, yellow],
    [44, 10, 47, 13, red],
    [8, 17, 10, 21, yellow],
    [8.5, 19, 9.5, 20, gray],
    [19, 17, 23, 27, yellow],
    [7, 24, 11, 27, red],
    [13.5, 22, 17, 23, yellow],
    [13.5, 23, 17, 27, blue],
    [14, 24.3, 16.4, 26, yellow],
    [19, 22.8, 23, 25.7, gray],
    [33.5, 22, 38, 28.7, red],
    [34.5, 23.5, 37.2, 25.8, gray],
    [33.5, 28.7, 38, 30, gray],
    [43, 23, 48, 26, yellow],
    [45, 23, 46, 26, red],
    [4, 32, 7, 35, blue],
    [43, 32, 46, 35, blue],
    [43, 35, 46, 37, yellow],
    [43, 37, 46, 40, red],
    [7, 38, 11, 42, yellow],
    [8.5, 39, 10, 40.2, gray],
    [21, 48, 25, 49.8, red],
  ];
    for (let rect of rectangles) {
      drawRectangle(rect[0], rect[1], rect[2], rect[3], rect[4]);
    }
  
  function draw() {
    background(220);
    drawGrid();
    drawLines();
    drawRectangles();
  }  

}