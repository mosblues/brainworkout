const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const previewCanvas = document.getElementById("previewCanvas");
const previewCtx = previewCanvas.getContext("2d");

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

let startPoint = null;
let currentLine = null;

function resizeCanvas() {
  const rect = wrapper.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.height;

  previewCanvas.width = rect.width;
  previewCanvas.height = rect.height;
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
  const rect = previewCanvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function snapToEightDirections(start, current) {
  const dx = current.x - start.x;
  const dy = current.y - start.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 5) {
    return current;
  }

  const angle = Math.atan2(dy, dx);
  const snapAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);

  return {
    x: start.x + Math.cos(snapAngle) * distance,
    y: start.y + Math.sin(snapAngle) * distance
  };
}

function drawLine(targetCtx, start, end, isPreview = false) {
  targetCtx.save();

  targetCtx.lineWidth = brushSize;
  targetCtx.lineCap = "round";
  targetCtx.lineJoin = "round";

  if (currentTool === "pen") {
    targetCtx.globalCompositeOperation = "source-over";
    targetCtx.strokeStyle = hexToRgba(brushColor, isPreview ? 0.25 : brushOpacity);
  } else {
    targetCtx.globalCompositeOperation = "destination-out";
    targetCtx.strokeStyle = "rgba(0, 0, 0, 1)";
  }

  targetCtx.beginPath();
  targetCtx.moveTo(start.x, start.y);
  targetCtx.lineTo(end.x, end.y);
  targetCtx.stroke();

  targetCtx.restore();
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
  startPoint = getPointerPosition(event);
  currentLine = null;

  previewCanvas.setPointerCapture(event.pointerId);
}

function draw(event) {
  event.preventDefault();
  updateBrushCursor(event);

  if (!isDrawing || !startPoint) return;

  const currentPoint = getPointerPosition(event);
  const snappedPoint = snapToEightDirections(startPoint, currentPoint);

  currentLine = {
    start: startPoint,
    end: snappedPoint
  };

  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  drawLine(previewCtx, currentLine.start, currentLine.end, true);
}

function stopDrawing(event) {
  if (!isDrawing) return;

  isDrawing = false;

  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

  if (currentLine) {
    drawLine(ctx, currentLine.start, currentLine.end, false);
  }

  startPoint = null;
  currentLine = null;
}

previewCanvas.addEventListener("pointerdown", startDrawing);
previewCanvas.addEventListener("pointermove", draw);
previewCanvas.addEventListener("pointerup", stopDrawing);
previewCanvas.addEventListener("pointercancel", stopDrawing);

previewCanvas.addEventListener("pointerenter", () => {
  brushCursor.style.display = "block";
});

previewCanvas.addEventListener("pointerleave", () => {
  if (!isDrawing) {
    brushCursor.style.display = "none";
  }
});

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
  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
});

sizeSlider.addEventListener("input", () => {
  brushSize = Number(sizeSlider.value);
});

colorPicker.addEventListener("input", () => {
  brushColor = colorPicker.value;
});
