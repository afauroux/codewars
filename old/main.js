import Letter from "./letter.js";

//------------------------------ CONSTANTES -------------------------------

const DEFAULT_FONT = "40px sans serif";
const CELL_SIZE = 20;
const a = Letter("a", 0, 0);
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//-------------------------------- CLASSES --------------------------------

class Vect {
  static fromArray(array) {
    return new Vect(array[0], array[1]);
  }
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get realx() {
    Math.floor((winPos.x + this.x) / CELL_SIZE);
  }
  get realy() {
    Math.floor((winPos.y + this.y) / CELL_SIZE);
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
  }
}

class letter extends Vect {
  constructor(name, x, y) {
    super(x, y);
    this.name = name;
  }
  draw() {
    ctx.beginPath();
    ctx.font = DEFAULT_FONT;
    ctx.fillStyle = "black";
    ctx.fillText(this.name, this.realx, this.realy);
  }
}
//-------------------------------- UTILS --------------------------------

function drawBoard() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.beginPath();
  for (var x = winPos.x % CELL_SIZE; x <= ctx.canvas.width; x += CELL_SIZE) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
  }
  for (var y = winPos.y % CELL_SIZE; y <= ctx.canvas.height; y += CELL_SIZE) {
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
  }
  ctx.strokeStyle = "lightgray";
  ctx.stroke();
}

//------------------------------ INITIALISATION ------------------------------

let winPos = new Vect(-100, -100);
let cursor = { x: -1, y: -1 };

let play = false;
let grid = new Map();
let tickLenght = 0;
let tickNow = performance.now();
let tickPrev = performance.now();

let letters = [new letter("a", 0, 0)];
for (let i = 0; i < 100; i++) {
  letters.push(new letter("a", i, i));
}
//-------------------------------- LISTENERS --------------------------------

window.onresize = function(event) {
  //this.console.log("resized");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
};
canvas.onwheel = function(event) {
  winPos.x -= event.deltaX;
  winPos.y -= event.deltaY;
  document.querySelector("#position").textContent = `(
  ${Math.floor(winPos.x / CELL_SIZE)}
  ${Math.floor(winPos.y / CELL_SIZE)}
  )`;
};
document.onkeydown = function(ev) {
  let dir;
  switch (ev.keyCode) {
    case 37:
      dir = [-1, 0];
      break;
    case 38:
      dir = [0, -1];
      break;
    case 39:
      dir = [1, 0];
      break;
    case 40:
      dir = [0, 1];
      break;
    default:
      return;
  }
  letters[0].add(Vect.fromArray(dir));
};
//-------------------------------- MAIN LOOP --------------------------------

redraw = function() {
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawBoard();
  for (l of letters) {
    l.draw();
  }
  window.requestAnimationFrame(redraw);
};
window.requestAnimationFrame(redraw);
