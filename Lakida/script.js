/* -------------------
   FALLING EMOJIS (MAIN DASHBOARD)
------------------- */
const mainEmojis = ["🌹", "❤️"];

function createMainEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = mainEmojis[Math.floor(Math.random() * mainEmojis.length)];
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.fontSize = 18 + Math.random() * 14 + "px";
  emoji.style.animationDuration = 8 + Math.random() * 6 + "s";

  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 15000);
}

setInterval(createMainEmoji, 500);

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
   SEASON BUTTON LOGIC
------------------- */
const month = new Date().getMonth(); // 0 = Jan
const seasonBtn = document.getElementById("seasonButton");

if (month === 11) { // December
  seasonBtn.innerText = "🎄 Christmas";
  seasonBtn.href = "/lakida/christmas";
  seasonBtn.classList.add("christmas");
} else if (month >= 8 && month <= 10) { // Fall
  seasonBtn.innerText = "🎃 Halloween";
  seasonBtn.href = "/lakida/halloween";
  seasonBtn.classList.add("halloween");
} else {
  seasonBtn.style.display = "none";
}
