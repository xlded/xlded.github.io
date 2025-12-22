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
   SEASONAL BUTTON (TRUE CLOSEST HOLIDAY)
------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const seasonBlock = document.getElementById("seasonBlock");
  const seasonText = document.getElementById("seasonText");
  if (!seasonBlock || !seasonText) return;

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

  const events = [
    { name: "💖 Our Anniversary 💖", path: "/anniversary", date: new Date(year, 4, 24) },
    { name: "Christmas🎄", path: "/christmas", date: new Date(year, 11, 25) },
    { name: "Halloween🎃", path: "/halloween", date: new Date(year, 9, 31) },
    { name: "Thanksgiving🦃", path: "/thanksgiving", date: thanksgivingDate(year) },
    { name: "Valentines day💝", path: "/valentinesday", date: new Date(year, 1, 14) },
    { name: "Easter🐇", path: "/easter", date: easterDate(year) },
    { name: "new years🎉", path: "/newyears", date: new Date(year, 0, 1) },
    { name: "National Girlfriend day💖", path: "/nationalgirlfriendday", date: new Date(year, 7, 1) },
    { name: "National boyfriend day💘", path: "/nationalboyfriendday", date: new Date(year, 9, 3) }
  ];

  // normalize dates around now
  events.forEach(e => {
    if (Math.abs(e.date - now) > 183 * 24 * 60 * 60 * 1000) {
      e.date.setFullYear(e.date.getFullYear() + (e.date < now ? 1 : -1));
    }
  });

  const closest = events.reduce((a, b) =>
    Math.abs(b.date - now) < Math.abs(a.date - now) ? b : a
  );

  seasonText.textContent = closest.name;
  seasonBlock.onclick = () => {
    window.location.href = closest.path;
  };
});

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

/* -------------------
   LOVE LETTER (MIDNIGHT + PASSWORD REROLL)
------------------- */

const LETTER_PASSWORD = "0976";
const LETTER_KEY = "loveLetterIndex";
const LETTER_DATE_KEY = "loveLetterDate";

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

fetch("love letter.txt")
  .then(res => res.text())
  .then(text => {
    const letters = text
      .split(";")            // semicolon-separated
      .map(l => l.trim())
      .filter(Boolean);

    if (!letters.length) return;

    const textEl = document.getElementById("loveLetterText");
    const block = document.getElementById("loveLetterBlock");
    if (!textEl || !block) return;

    const today = getTodayString();
    let savedDate = localStorage.getItem(LETTER_DATE_KEY);
    let index = localStorage.getItem(LETTER_KEY);

    // New day → new love letter
    if (savedDate !== today || index === null) {
      index = Math.floor(Math.random() * letters.length);
      localStorage.setItem(LETTER_KEY, index);
      localStorage.setItem(LETTER_DATE_KEY, today);
    }

    textEl.innerText = letters[index];

    // Password-protected reroll
    block.addEventListener("click", () => {
      const pass = prompt("💌 Enter password to change today’s love letter:");
      if (pass !== LETTER_PASSWORD) return;

      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * letters.length);
      } while (newIndex == index && letters.length > 1);

      index = newIndex;
      localStorage.setItem(LETTER_KEY, index);
      textEl.innerText = letters[index];
    });
  })
  .catch(err => {
    console.error("Love letter failed to load:", err);
  });


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
