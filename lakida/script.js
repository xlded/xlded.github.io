/* =========================
   CONFIG
========================= */
const START_DATE = new Date("May 24, 2025 00:00:00");

/* =========================
   COUNT-UP TIMER
========================= */
function updateTimer() {
  const now = new Date();
  let diff = now - START_DATE;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff %= (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  const timer = document.getElementById("timer");
  if (timer) {
    timer.innerText = `Together for ${days} days, ${hours}h ${minutes}m ${seconds}s 💕`;
  }
}
setInterval(updateTimer, 1000);
updateTimer();

/* =========================
   FALLING EMOJIS (MAIN)
========================= */
const mainEmojis = ["🌹", "❤️"];

function createFallingEmoji() {
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.innerText = mainEmojis[Math.floor(Math.random() * mainEmojis.length)];

  const size = 18 + Math.random() * 14;
  const angle = Math.random() * 360;
  const spinDuration = 20 + Math.random() * 20;
  const fallDuration = 14 + Math.random() * 10;

  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.fontSize = size + "px";
  emoji.style.transform = `rotate(${angle}deg)`;
  emoji.style.animation = `
    fall ${fallDuration}s linear,
    spin ${spinDuration}s linear infinite
  `;

  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), fallDuration * 1000);
}

setInterval(createFallingEmoji, 500);

/* =========================
   SPARKLING HEARTS IN TIMER BLOCK
========================= */
const timeBlock = document.querySelector('[data-function="time"]');

function createSparkleHeart() {
  if (!timeBlock) return;

  const heart = document.createElement("div");
  heart.className = "emoji sparkle";
  heart.innerText = "💖";

  const rect = timeBlock.getBoundingClientRect();
  heart.style.left = rect.left + Math.random() * rect.width + "px";
  heart.style.top = rect.top + Math.random() * rect.height + "px";
  heart.style.fontSize = 16 + Math.random() * 10 + "px";

  const angle = Math.random() * 360;
  const spinDuration = 12 + Math.random() * 18;

  heart.style.transform = `rotate(${angle}deg)`;
  heart.style.animation = `sparkle 2s ease-out, spin ${spinDuration}s linear infinite`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

setInterval(createSparkleHeart, 700);

/* =========================
   CLICK HEART ANIMATION
========================= */
document.addEventListener("click", (e) => {
  const heart = document.createElement("div");
  heart.className = "emoji click-heart";
  heart.innerText = "💖";

  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  heart.style.fontSize = "22px";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
});

/* =========================
   SEASONAL BUTTON (TRUE CLOSEST HOLIDAY)
========================= */
const seasonBtn = document.getElementById("seasonButton");

if (seasonBtn) {
  const now = new Date();
  const year = now.getFullYear();

  function easterDate(y) {
    const f = Math.floor,
      G = y % 19,
      C = f(y / 100),
      H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
      I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
      J = (y + f(y / 4) + I + 2 - C + f(C / 4)) % 7,
      L = I - J,
      month = 3 + f((L + 40) / 44),
      day = L + 28 - 31 * f(month / 4);
    return new Date(y, month - 1, day);
  }

  function thanksgivingDate(y) {
    const d = new Date(y, 10, 1);
    const offset = (4 - d.getDay() + 7) % 7;
    return new Date(y, 10, 1 + offset + 21);
  }

  const holidays = [
    { name: "Christmas🎄", path: "/christmas", date: new Date(year, 11, 25) },
    { name: "Halloween🎃", path: "/halloween", date: new Date(year, 9, 31) },
    { name: "Thanksgiving🦃", path: "/thanksgiving", date: thanksgivingDate(year) },
    { name: "Valentines day💝", path: "/valentinesday", date: new Date(year, 1, 14) },
    { name: "Easter🐇", path: "/easter", date: easterDate(year) },
    { name: "new years🎉", path: "/newyears", date: new Date(year, 0, 1) },
    { name: "National Girlfriend day💖", path: "/nationalgirlfriendday", date: new Date(year, 7, 1) },
    { name: "National boyfriend day💘", path: "/nationalboyfriendday", date: new Date(year, 9, 3) }
  ];

  const closest = holidays.reduce((a, b) =>
    Math.abs(b.date - now) < Math.abs(a.date - now) ? b : a
  );

  seasonBtn.innerText = closest.name;
  seasonBtn.href = closest.path;
}

/* =========================
   BLOCK CLICK SYSTEM
========================= */
document.querySelectorAll(".block").forEach(block => {
  block.addEventListener("click", () => {
    const func = block.dataset.function;
    switch (func) {
      case "time":
        break;
      case "season":
        break;
      case "photo":
        alert("Photo album coming soon 💕");
        break;
      default:
        console.log("Block clicked:", func);
    }
  });
});
