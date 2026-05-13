const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const image = document.getElementById("caseImage");
const wrapper = document.getElementById("caseWrapper");

const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

let isDrawing = false;
let currentTool = "pen";

function resizeCanvas() {
  const rect = wrapper.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.height;
}

image.onload = resizeCanvas;
window.addEventListener("resize", resizeCanvas);

function getPointerPosition(event) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function startDrawing(event) {
  event.preventDefault();
  isDrawing = true;

  const pos = getPointerPosition(event);

  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(event) {
  if (!isDrawing) return;

  event.preventDefault();

  const pos = getPointerPosition(event);

  ctx.lineWidth = currentTool === "pen" ? 18 : 28;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (currentTool === "pen") {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "rgba(255, 0, 0, 0.45)";
  } else {
    ctx.globalCompositeOperation = "destination-out";
  }

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointerleave", stopDrawing);
canvas.addEventListener("pointercancel", stopDrawing);

penBtn.addEventListener("click", () => {
  currentTool = "pen";
  penBtn.classList.add("active");
  eraserBtn.classList.remove("active");
});

eraserBtn.addEventListener("click", () => {
  currentTool = "eraser";
  eraserBtn.classList.add("active");
  penBtn.classList.remove("active");
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
