/* =========================
   CHRISTMAS EMOJIS
========================= */
const emojis = ["🎄", "❄️", "🎁"];

/* -------------------
   SNOW PILE SETUP
------------------- */
const snowPile = document.createElement("div");
snowPile.id = "snowPile";
document.body.appendChild(snowPile);
let snowHeight = 0;

/* -------------------
   FALLING EMOJIS
------------------- */
function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.fontSize = 18 + Math.random() * 14 + "px";
  emoji.style.animationDuration = 8 + Math.random() * 6 + "s";

  document.body.appendChild(emoji);

  emoji.addEventListener("animationend", () => {
    pileSnow();
  });

  setTimeout(() => emoji.remove(), 15000);
}

setInterval(createEmoji, 500);

function pileSnow() {
  if (snowHeight < 120) {
    snowHeight += 2;
    snowPile.style.height = snowHeight + "px";
  }
}

/* -------------------
   COUNT-UP TIMER
------------------- */
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

/* -------------------
   MUSIC BUTTON
------------------- */
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.innerText = "🔇 Mute Music";
  } else {
    music.pause();
    musicBtn.innerText = "🔊 Play Music";
  }
});
