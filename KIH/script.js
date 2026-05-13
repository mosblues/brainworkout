const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const image = document.getElementById("caseImage");
const wrapper = document.getElementById("caseWrapper");

const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

const sizeSlider = document.getElementById("sizeSlider");
const colorPicker = document.getElementById("colorPicker");
const brushCursor = document.getElementById("brushCursor");

let isDrawing = false;
let currentTool = "pen";
let brushSize = Number(sizeSlider.value);
let brushColor = colorPicker.value;
let brushOpacity = 0.35;

function resizeCanvas() {
  const rect = wrapper.getBoundingClientRect();

  const previousImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

  canvas.width = rect.width;
  canvas.height = rect.height;

  try {
    ctx.putImageData(previousImage, 0, 0);
  } catch (error) {
    // Ignore if canvas size changed before anything was drawn
  }
}

image.onload = resizeCanvas;
window.addEventListener("resize", resizeCanvas);

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function getPointerPosition(event) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function updateBrushCursor(event) {
  const pos = getPointerPosition(event);

  brushCursor.style.left = `${pos.x}px`;
  brushCursor.style.top = `${pos.y}px`;
  brushCursor.style.width = `${brushSize}px`;
  brushCursor.style.height = `${brushSize}px`;

  if (currentTool === "pen") {
    brushCursor.style.background = hexToRgba(brushColor, 0.2);
    brushCursor.style.borderColor = hexToRgba(brushColor, 0.9);
  } else {
    brushCursor.style.background = "rgba(255, 255, 255, 0.15)";
    brushCursor.style.borderColor = "rgba(255, 255, 255, 0.9)";
  }
}

function startDrawing(event) {
  event.preventDefault();
  isDrawing = true;

  const pos = getPointerPosition(event);

  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
}

function draw(event) {
  updateBrushCursor(event);

  if (!isDrawing) return;

  event.preventDefault();

  const pos = getPointerPosition(event);

  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (currentTool === "pen") {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = hexToRgba(brushColor, brushOpacity);
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
canvas.addEventListener("pointerleave", () => {
  stopDrawing();
  brushCursor.style.display = "none";
});
canvas.addEventListener("pointerenter", () => {
  brushCursor.style.display = "block";
});
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

sizeSlider.addEventListener("input", () => {
  brushSize = Number(sizeSlider.value);
});

colorPicker.addEventListener("input", () => {
  brushColor = colorPicker.value;
});
