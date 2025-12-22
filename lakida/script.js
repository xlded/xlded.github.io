// ==============================
// SETTINGS
// ==============================
const emojiCount = 25; // number of emojis
const emojisDefault = ["💖","🥀"]; // normal dashboard emojis
const emojisChristmas = ["🎄","❄️","🎁"]; // christmas emojis
const emojisHalloween = ["🎃","👻","🍬"]; // halloween emojis

const container = document.body;

// Determine which emoji set to use based on month
const month = new Date().getMonth() + 1;
let emojis = emojisDefault;
if (month === 12) emojis = emojisChristmas;
if (month === 10) emojis = emojisHalloween;

// ==============================
// CREATE FALLING EMOJIS
// ==============================
function createEmoji() {
  const span = document.createElement("span");
  span.classList.add("emoji");
  span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  span.style.left = Math.random() * window.innerWidth + "px"; // random horizontal start
  span.style.fontSize = (16 + Math.random() * 24) + "px"; // random size
  span.style.transform = `rotate(${Math.random()*360}deg)`; // random starting rotation
  span.style.animationDuration = (8 + Math.random()*4) + "s"; // fall speed
  span.style.animationDelay = Math.random() * 5 + "s"; // stagger start
  container.appendChild(span);

  // Remove emoji after falling out of screen
  span.addEventListener("animationiteration", () => {
    span.remove();
    createEmoji();
  });
}

// Initialize emojis
for (let i=0; i<emojiCount; i++) createEmoji();

// ==============================
// TIMER COUNT-UP
// ==============================
const timerEl = document.querySelector(".timer");
const startDate = new Date("2025-05-24T00:00:00");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  timerEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateTimer, 1000);
updateTimer();
