let gridSize = 50;
let canvasSize = 800;

let yellow = '#ffd800'

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

}