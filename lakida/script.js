/* -------------------
   FALLING EMOJIS (MAIN DASHBOARD)
------------------- */
const mainEmojis = ["🌹", "💔"];

function createMainEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = mainEmojis[Math.floor(Math.random() * mainEmojis.length)];

  // random position
  emoji.style.left = Math.random() * (window.innerWidth - 30) + "px";

  // random font size
  emoji.style.fontSize = 18 + Math.random() * 14 + "px";

  // slow random rotation start
  const angle = Math.random() * 360;
  emoji.style.transform = `rotate(${angle}deg)`;
  const spinDuration = 15 + Math.random() * 20; // slow spin 15–35s
  emoji.style.animation = `fall ${8 + Math.random() * 6}s linear, spin ${spinDuration}s linear infinite`;

  // prevent interaction
  emoji.style.pointerEvents = "none";

  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 15000);
}

setInterval(createMainEmoji, 500);

/* -------------------
   Sprinkle extra hearts in top timer block
------------------- */
const topBlock = document.querySelector(".block-top");
function createTopHeart() {
  const heart = document.createElement("div");
  heart.classList.add("emoji");
  heart.innerText = "💖";
  const rect = topBlock.getBoundingClientRect();
  heart.style.left = rect.left + Math.random() * rect.width + "px";
  heart.style.top = rect.top + Math.random() * rect.height + "px";
  heart.style.fontSize = 18 + Math.random() * 10 + "px";

  const angle = Math.random() * 360;
  heart.style.transform = `rotate(${angle}deg)`;
  const spinDuration = 10 + Math.random() * 15;
  heart.style.animation = `spin ${spinDuration}s linear infinite`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}

setInterval(createTopHeart, 800);

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
const month = new Date().getMonth();
const seasonBtn = document.getElementById("seasonButton");

if (month === 11) { // December
  seasonBtn.innerText = "🎄 Christmas";
  seasonBtn.href = "/lakida/Christmas.com/index.html";
  seasonBtn.classList.add("christmas");
} else if (month >= 8 && month <= 10) { // Fall
  seasonBtn.innerText = "🎃 Halloween";
  seasonBtn.href = "/lakida/Halloween.com/index.html";
  seasonBtn.classList.add("halloween");
} else {
  seasonBtn.style.display = "none";
}
