/* =========================
   SEASON DETECTION
========================= */
const month = new Date().getMonth(); // 0 = Jan

let emojis = ["🌹", "❤"]; // default
let mode = "default";

const seasonBtn = document.getElementById("seasonButton");

/* ---- SEASONS ---- */
if (month === 11) { // December
  emojis = ["❄️"];
  mode = "christmas";

  seasonBtn.innerText = "🎄 Christmas";
  seasonBtn.href = "/lakida/Christmas.com";
  seasonBtn.classList.add("christmas");

} else if (month >= 8 && month <= 10) { // Fall
  emojis = ["🎃"];
  mode = "halloween";

  seasonBtn.innerText = "🎃 Halloween";
  seasonBtn.href = "/lakida/Halloween.com";
  seasonBtn.classList.add("halloween");

} else {
  seasonBtn.style.display = "none";
}

/* =========================
   FALLING EMOJIS
========================= */
function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.fontSize = 18 + Math.random() * 14 + "px";
  emoji.style.animationDuration = 8 + Math.random() * 6 + "s";

  /* 🎃 GLOWING PUMPKINS */
  if (mode === "halloween") {
    emoji.style.filter = "drop-shadow(0 0 6px orange)";
    emoji.style.animation += ", glow 2s ease-in-out infinite";
  }

  document.body.appendChild(emoji);

  /* ❄️ SNOW PILING */
  if (mode === "christmas") {
    emoji.addEventListener("animationend", () => {
      pileSnow(emoji.style.left);
    });
  }

  setTimeout(() => emoji.remove(), 15000);
}

setInterval(createEmoji, 500);

/* =========================
   SNOW PILE SYSTEM
========================= */
const snowPile = document.createElement("div");
snowPile.style.position = "fixed";
snowPile.style.bottom = "0";
snowPile.style.left = "0";
snowPile.style.width = "100%";
snowPile.style.height = "0px";
snowPile.style.background =
  "linear-gradient(to top, #ffffff, rgba(255,255,255,0.8))";
snowPile.style.zIndex = "5";
snowPile.style.transition = "height 0.5s ease";
document.body.appendChild(snowPile);

let snowHeight = 0;

function pileSnow() {
  if (snowHeight < 120) {
    snowHeight += 2;
    snowPile.style.height = snowHeight + "px";
  }
}

/* =========================
   COUNT-UP TIMER
========================= */
const startDate = new Date("May 24, 2025 00:00:00");

function updateTimer() {
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff %= (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  document.getElementById("timer").innerText =
    `Together for ${days} days, ${hours}h ${minutes}m ${seconds}s 💕`;
}

setInterval(updateTimer, 1000);
updateTimer();

/* =========================
   EXTRA CSS ANIMATIONS
========================= */
const style = document.createElement("style");
style.innerHTML = `
@keyframes glow {
  0%   { filter: drop-shadow(0 0 4px orange); }
  50%  { filter: drop-shadow(0 0 12px orange); }
  100% { filter: drop-shadow(0 0 4px orange); }
}
`;
document.head.appendChild(style);
