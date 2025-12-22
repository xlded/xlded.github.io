/* -------------------
   FALLING EMOJIS (MAIN DASHBOARD)
------------------- */
const mainEmojis = ["🌹", "❤️"];

function createMainEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = mainEmojis[Math.floor(Math.random() * mainEmojis.length)];

  emoji.style.left = Math.random() * (window.innerWidth - 30) + "px";
  emoji.style.fontSize = 18 + Math.random() * 14 + "px";

  const angle = Math.random() * 360;
  const spinDuration = 25 + Math.random() * 20;   // slower spin
  const fallDuration = 16 + Math.random() * 10;   // MUCH longer fall

  emoji.style.transform = `rotate(${angle}deg)`;
  emoji.style.animation = `
    fall ${fallDuration}s linear,
    spin ${spinDuration}s linear infinite
  `;

  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), fallDuration * 1000 + 2000);
}

setInterval(createMainEmoji, 600);

/* -------------------
   SPARKLING HEARTS IN TIME BLOCK
------------------- */
const timeBlock = document.querySelector('[data-function="time"]');

function createTopHeart() {
  if (!timeBlock) return;

  const heart = document.createElement("div");
  heart.classList.add("emoji");
  heart.innerText = "💖";

  const rect = timeBlock.getBoundingClientRect();

  heart.style.left = rect.left + Math.random() * rect.width + "px";
  heart.style.top = rect.top + Math.random() * rect.height + "px";
  heart.style.fontSize = 16 + Math.random() * 10 + "px";

  const angle = Math.random() * 360;
  const spinDuration = 12 + Math.random() * 18;

  heart.style.transform = `rotate(${angle}deg)`;
  heart.style.animation = `spin ${spinDuration}s linear infinite`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 9000);
}

setInterval(createTopHeart, 900);

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

updateTimer();
setInterval(updateTimer, 1000);

/* -------------------
   BLOCK CLICK FEEDBACK
------------------- */
document.querySelectorAll(".block").forEach(block => {
  block.addEventListener("click", () => {
    block.style.transform = "scale(0.97)";
    setTimeout(() => {
      block.style.transform = "";
    }, 150);
  });
});
