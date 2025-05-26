// Atualiza relógio
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

// Atualiza data formatada
function updateDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('pt-BR', options);
  document.getElementById('date').textContent = dateStr;
}

updateDate();

// Cronômetro
let stopwatchInterval;
let startTime;
let elapsed = 0;
let running = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateStopwatch() {
  const now = Date.now();
  elapsed = now - startTime;
  document.getElementById('stopwatch').textContent = formatTime(elapsed);
}

function startStopwatch() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsed;
  stopwatchInterval = setInterval(updateStopwatch, 10);
}

function stopStopwatch() {
  running = false;
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  stopStopwatch();
  elapsed = 0;
  document.getElementById('stopwatch').textContent = '00:00:00.000';
}

// Alarme
let alarmTime = null;
const alarmSound = new Audio("https://www.soundjay.com/button/beep-07.wav");

function setAlarm() {
  const time = prompt("Defina o alarme no formato HH:MM:SS:");
  if (time && /^\d{2}:\d{2}:\d{2}$/.test(time)) {
    alarmTime = time;
    alert(`Alarme definido para ${alarmTime}`);
  } else {
    alert("Formato inválido. Use HH:MM:SS.");
  }
}

function checkAlarm() {
  if (!alarmTime) return;
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 8);
  if (alarmTime === currentTime) {
    alarmSound.play();
    document.body.style.background = "#ff0000";
    setTimeout(() => {
      document.body.style.background = "";
      alarmTime = null;
    }, 3000);
  }
}

setInterval(checkAlarm, 1000);

// Alternar tema claro/escuro com nome dinâmico
function toggleTheme() {
  const body = document.body;
  const button = document.getElementById("theme-button");
  const isLight = body.classList.toggle("light-theme");

  button.textContent = isLight ? "Tema Escuro" : "Tema Claro";
}
