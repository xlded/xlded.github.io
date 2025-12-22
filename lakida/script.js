/* ------------------
   FALLING EMOJIS
------------------ */
const emojis = ["🌹", "❤️"];

function spawnEmoji() {
  const e = document.createElement("div");
  e.className = "emoji";
  e.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  const size = 18 + Math.random() * 14;
  const left = Math.random() * window.innerWidth;
  const fallTime = 14 + Math.random() * 8;   // LONGER fall
  const spinTime = 20 + Math.random() * 25;  // slower spin
  const startAngle = Math.random() * 360;

  e.style.left = left + "px";
  e.style.fontSize = size + "px";
  e.style.transform = `rotate(${startAngle}deg)`;
  e.style.animationDuration = `${fallTime}s, ${spinTime}s`;

  document.body.appendChild(e);

  setTimeout(() => e.remove(), fallTime * 1000 + 2000);
}

setInterval(spawnEmoji, 600);

/* ------------------
   COUNT UP TIMER
------------------ */
const startDate = new Date("May 24, 2025 00:00:00");

function updateTimer() {
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  diff %= 60000;
  const seconds = Math.floor(diff / 1000);

  document.getElementById("timer").textContent =
    `Together for ${days} days, ${hours}h ${minutes}m ${seconds}s 💕`;
}

updateTimer();
setInterval(updateTimer, 1000);

/* ------------------
   SPARKLING HEARTS
------------------ */
const timeBlock = document.querySelector(".block-wide");

function spawnSparkle() {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.textContent = "💖";

  s.style.left = Math.random() * 90 + "%";
  s.style.fontSize = 14 + Math.random() * 10 + "px";

  timeBlock.appendChild(s);

  setTimeout(() => s.remove(), 4000);
}

setInterval(spawnSparkle, 900);
