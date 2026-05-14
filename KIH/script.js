const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

const previewCanvas = document.getElementById("previewCanvas");
const previewCtx = previewCanvas.getContext("2d");

const image = document.getElementById("caseImage");

const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeBtn = document.getElementById("sizeBtn");

const sizePanel = document.getElementById("sizePanel");

const sizeSlider = document.getElementById("sizeSlider");

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");

const brushCursor = document.getElementById("brushCursor");

const checkAnswersBtn = document.getElementById("checkAnswersBtn");

const weaponInput = document.getElementById("weaponInput");
const killerInput = document.getElementById("killerInput");
const victimInput = document.getElementById("victimInput");
const locationInput = document.getElementById("locationInput");

const solvedOverlay = document.getElementById("solvedOverlay");
const timerElement = document.getElementById("timer");
const timerContainer = document.getElementById("timerContainer");
const timerLabel = document.getElementById("timerLabel");
const shareBtn = document.getElementById("shareBtn");
const shareMessage = document.getElementById("shareMessage");

const helpBtn = document.getElementById("helpBtn");
const tutorialModal = document.getElementById("tutorialModal");
const closeTutorialBtn = document.getElementById("closeTutorialBtn");

let todayCase = null;

let timerInterval = null;
let startTime = null;
let solved = false;
let finalTime = "00:00";

let isDrawing = false;
let brushColor = colorPicker.value;
let brushOpacity = 0.35;

let startPoint = null;
let currentLine = null;

let strokes = [];

function getTodayDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function loadTodayCase() {
  try {
    const response = await fetch("cases.json");
    const cases = await response.json();

    const today = getTodayDate();

    todayCase = cases.find(c => c.date === today);

    if (!todayCase) {
      alert("No case available for today.");
      return;
    }

    image.src = todayCase.image;
    startTimer();

  } catch (error) {
    console.error(error);
    alert("Failed to load cases.");
  }
}

function startTimer() {
  startTime = Date.now();

  timerInterval = setInterval(() => {
    if (solved) return;

    const elapsed = Date.now() - startTime;

    const totalSeconds = Math.floor(elapsed / 1000);

    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    timerElement.textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function stopTimer() {
  solved = true;

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  finalTime = timerElement.textContent;

  timerLabel.textContent = "SOLVED IN";
  timerContainer.classList.add("solved");
  shareBtn.style.display = "block";
}

async function shareResult() {
  const shareText =
    `I solved today’s The Killer is Here case in ${finalTime}.\nCan you beat me?`;

  const fullText =
    `${shareText}\n\n${window.location.href}`;

  shareMessage.textContent = "";

  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile && navigator.share) {
    try {
      await navigator.share({
        title: "The Killer is Here",
        text: shareText,
        url: window.location.href
      });

      return;

    } catch (error) {
      console.log("Share cancelled or failed:", error);
    }
  }

  try {
    await navigator.clipboard.writeText(fullText);
    shareMessage.textContent = "Result copied!";
  } catch (error) {
    shareMessage.innerHTML = `
      Copy this:<br>
      <textarea readonly style="width:100%;height:90px;margin-top:6px;">${fullText}</textarea>
    `;
  }
}


function normalizeText(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function validateField(inputElement, correctAnswer) {
  const userAnswer = normalizeText(inputElement.value);
  const correct = normalizeText(correctAnswer);

  inputElement.classList.remove("answer-correct", "answer-wrong");

  if (userAnswer === correct) {
    inputElement.classList.add("answer-correct");
    return true;
  } else {
    inputElement.classList.add("answer-wrong");
    return false;
  }
}

checkAnswersBtn.addEventListener("click", () => {
  if (!todayCase) return;

  const weaponOk = validateField(weaponInput, todayCase.weapon);
  const killerOk = validateField(killerInput, todayCase.killer);
  const victimOk = validateField(victimInput, todayCase.victim);
  const locationOk = validateField(locationInput, todayCase.location);

  if (weaponOk && killerOk && victimOk && locationOk) {
    stopTimer();
    solvedOverlay.style.display = "flex";
  }
});

function getInitialBrushSize() {
  return window.innerWidth <= 768 ? 10 : 18;
}

let brushSize = getInitialBrushSize();
sizeSlider.value = brushSize;

function resizeCanvas() {
  const imageWidth = image.clientWidth;
  const imageHeight = image.clientHeight;

  canvas.width = imageWidth;
  canvas.height = imageHeight;

  previewCanvas.width = imageWidth;
  previewCanvas.height = imageHeight;

  canvas.style.width = `${imageWidth}px`;
  canvas.style.height = `${imageHeight}px`;

  previewCanvas.style.width = `${imageWidth}px`;
  previewCanvas.style.height = `${imageHeight}px`;

  redrawStrokes();
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

  brushCursor.style.left = `${pos.x}px`;
  brushCursor.style.top = `${pos.y}px`;
  brushCursor.style.width = `${brushSize}px`;
  brushCursor.style.height = `${brushSize}px`;
  brushCursor.style.background = hexToRgba(brushColor, 0.2);
  brushCursor.style.borderColor = hexToRgba(brushColor, 0.9);
}

function startDrawing(event) {
  event.preventDefault();

  closeToolPanels();

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

function openTutorial() {
  tutorialModal.classList.add("open");
}

function closeTutorial() {
  tutorialModal.classList.remove("open");
  localStorage.setItem("tutorialSeen", "true");
}

function showTutorialIfFirstVisit() {
  const tutorialSeen = localStorage.getItem("tutorialSeen");

  if (!tutorialSeen) {
    openTutorial();
  }
}

function closeToolPanels() {
  sizePanel.classList.remove("open");
}

function togglePanel(panelToToggle) {
  const isOpen = panelToToggle.classList.contains("open");

  closeToolPanels();

  if (!isOpen) {
    panelToToggle.classList.add("open");
  }
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

undoBtn.addEventListener("click", () => {
  closeToolPanels();
  strokes.pop();
  redrawStrokes();
});

clearBtn.addEventListener("click", () => {
  closeToolPanels();

  strokes = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
});

sizeBtn.addEventListener("click", () => {
  togglePanel(sizePanel);
});

sizeSlider.addEventListener("input", () => {
  brushSize = Number(sizeSlider.value);
});

colorPicker.addEventListener("input", () => {
  brushColor = colorPicker.value;
  colorBtn.style.background = brushColor;
  closeToolPanels();
});

shareBtn.addEventListener("click", shareResult);

helpBtn.addEventListener("click", () => {
  closeToolPanels();
  openTutorial();
});

closeTutorialBtn.addEventListener("click", closeTutorial);

tutorialModal.addEventListener("click", (event) => {
  if (event.target === tutorialModal) {
    closeTutorial();
  }
});

loadTodayCase();
showTutorialIfFirstVisit();
