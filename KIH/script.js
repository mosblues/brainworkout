const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const previewCanvas = document.getElementById("previewCanvas");
const previewCtx = previewCanvas.getContext("2d");

const image = document.getElementById("caseImage");
const wrapper = document.getElementById("caseWrapper");
const imageStage = document.getElementById("imageStage");

const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");

const sizeSlider = document.getElementById("sizeSlider");
const colorPicker = document.getElementById("colorPicker");
const brushCursor = document.getElementById("brushCursor");

const checkAnswersBtn = document.getElementById("checkAnswersBtn");

let isDrawing = false;
let brushColor = colorPicker.value;
let brushOpacity = 0.35;

let startPoint = null;
let currentLine = null;

let strokes = [];

let zoomLevel = 1;
const zoomStep = 0.1;
const minZoom = 0.7;
const maxZoom = 1.8;

function getInitialBrushSize() {
  return window.innerWidth <= 768 ? 10 : 18;
}

let baseBrushSize = getInitialBrushSize();
let brushSize = baseBrushSize;

sizeSlider.value = baseBrushSize;

function updateBrushSizeFromZoom() {
  brushSize = Math.round(baseBrushSize * zoomLevel);
  sizeSlider.value = brushSize;
}

function resizeCanvas() {
  const imageRect = image.getBoundingClientRect();

  canvas.width = imageRect.width;
  canvas.height = imageRect.height;

  previewCanvas.width = imageRect.width;
  previewCanvas.height = imageRect.height;

  canvas.style.width = `${imageRect.width}px`;
  canvas.style.height = `${imageRect.height}px`;

  previewCanvas.style.width = `${imageRect.width}px`;
  previewCanvas.style.height = `${imageRect.height}px`;

  canvas.style.width = `${image.width}px`;
canvas.style.height = `${image.height}px`;

previewCanvas.style.width = `${image.width}px`;
previewCanvas.style.height = `${image.height}px`;

applyZoom();
redrawStrokes();
}

function applyZoom() {
  imageStage.style.transform = `scale(${zoomLevel})`;
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
    x: (event.clientX - rect.left) / zoomLevel,
    y: (event.clientY - rect.top) / zoomLevel
  };
}

function normalizePoint(point) {
  return {
    x: point.x / canvas.width,
    y: point.y / canvas.height
  };
}

function denormalizePoint(point) {
  return {
    x: point.x * canvas.width,
    y: point.y * canvas.height
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

function drawLine(targetCtx, start, end, size, color, opacity) {
  targetCtx.save();

  targetCtx.lineWidth = size;
  targetCtx.lineCap = "round";
  targetCtx.lineJoin = "round";
  targetCtx.globalCompositeOperation = "source-over";
  targetCtx.strokeStyle = hexToRgba(color, opacity);

  targetCtx.beginPath();
  targetCtx.moveTo(start.x, start.y);
  targetCtx.lineTo(end.x, end.y);
  targetCtx.stroke();

  targetCtx.restore();
}

function drawDot(targetCtx, point, size, color, opacity) {
  targetCtx.save();

  targetCtx.globalCompositeOperation = "source-over";
  targetCtx.fillStyle = hexToRgba(color, opacity);

  targetCtx.beginPath();
  targetCtx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
  targetCtx.fill();

  targetCtx.restore();
}

function redrawStrokes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  strokes.forEach(stroke => {
    if (stroke.type === "line") {
      const start = denormalizePoint(stroke.start);
      const end = denormalizePoint(stroke.end);

      drawLine(ctx, start, end, stroke.size, stroke.color, stroke.opacity);
    }

    if (stroke.type === "dot") {
      const point = denormalizePoint(stroke.point);

      drawDot(ctx, point, stroke.size, stroke.color, stroke.opacity);
    }
  });
}

function updateBrushCursor(event) {
  const pos = getPointerPosition(event);

  brushCursor.style.left = `${pos.x * zoomLevel + previewCanvas.offsetLeft}px`;
  brushCursor.style.top = `${pos.y * zoomLevel + previewCanvas.offsetTop}px`;
  brushCursor.style.width = `${brushSize * zoomLevel}px`;
  brushCursor.style.height = `${brushSize * zoomLevel}px`;
  brushCursor.style.background = hexToRgba(brushColor, 0.2);
  brushCursor.style.borderColor = hexToRgba(brushColor, 0.9);
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
  drawLine(previewCtx, currentLine.start, currentLine.end, brushSize, brushColor, 0.25);
}

function stopDrawing() {
  if (!isDrawing) return;

  isDrawing = false;

  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

  if (currentLine) {
    strokes.push({
      type: "line",
      start: normalizePoint(currentLine.start),
      end: normalizePoint(currentLine.end),
      size: brushSize,
      color: brushColor,
      opacity: brushOpacity
    });
  } else if (startPoint) {
    strokes.push({
      type: "dot",
      point: normalizePoint(startPoint),
      size: brushSize,
      color: brushColor,
      opacity: brushOpacity
    });
  }

  redrawStrokes();

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

zoomInBtn.addEventListener("click", () => {
  zoomLevel = Math.min(maxZoom, zoomLevel + zoomStep);
  updateBrushSizeFromZoom();
  applyZoom();
});

zoomOutBtn.addEventListener("click", () => {
  zoomLevel = Math.max(minZoom, zoomLevel - zoomStep);
  updateBrushSizeFromZoom();
  applyZoom();
});

undoBtn.addEventListener("click", () => {
  strokes.pop();
  redrawStrokes();
});

clearBtn.addEventListener("click", () => {
  strokes = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
});

sizeSlider.addEventListener("input", () => {
  baseBrushSize = Number(sizeSlider.value) / zoomLevel;
  brushSize = Number(sizeSlider.value);
});

colorPicker.addEventListener("input", () => {
  brushColor = colorPicker.value;
});

checkAnswersBtn.addEventListener("click", () => {
  // Validation will be added later.
});
