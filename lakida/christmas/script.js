/* =========================
   CONFIG
========================= */
const START_DATE = new Date("May 24, 2025");
const LETTER_FILE = "christmas-letter.txt";
const BACKGROUND_SCROLL_AMOUNT = 0.3; // px per character typed
const TYPE_SPEED = 45; // ms per character

/* =========================
   ELEMENTS
========================= */
const typeEl = document.getElementById("typewriter");
const btn = document.getElementById("christmasBtn");
const countdownEl = document.getElementById("countdown");

/* =========================
   INITIAL STATE
========================= */
btn.style.opacity = 0;
btn.style.pointerEvents = "none";
countdownEl.style.opacity = 0;

document.body.style.backgroundImage = "url('background.jpg')";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundPosition = "center top";

/* =========================
   TYPEWRITER + BACKGROUND SCROLL
========================= */
fetch(LETTER_FILE)
  .then(res => res.text())
  .then(text => startTypewriter(text));

function startTypewriter(text) {
  let i = 0;
  let bgOffset = 0;

  function type() {
    if (i < text.length) {
      const char = text[i];

      typeEl.innerHTML += char === "\n" ? "<br>" : char;
      i++;

      bgOffset += BACKGROUND_SCROLL_AMOUNT;
      document.body.style.backgroundPosition = `center ${bgOffset}px`;

      setTimeout(type, TYPE_SPEED);
    } else {
      revealButton();
    }
  }

  type();
}

/* =========================
   BUTTON REVEAL
========================= */
function revealButton() {
  btn.style.opacity = 1;
  btn.style.pointerEvents = "auto";
}

/* =========================
   BUTTON CLICK → COUNTDOWN
========================= */
btn.addEventListener("click", () => {
  countdownEl.style.opacity = 1;
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

/* =========================
   COUNTDOWN LOGIC
========================= */
function updateCountdown() {
  const now = new Date();

  // Next Christmas
  let nextChristmas = new Date(now.getFullYear(), 11, 25);
  if (now > nextChristmas) {
    nextChristmas = new Date(now.getFullYear() + 1, 11, 25);
  }

  const diff = nextChristmas - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Christmases spent together
  let spent = now.getFullYear() - START_DATE.getFullYear();
  const thisYearsChristmas = new Date(now.getFullYear(), 11, 25);
  if (now < thisYearsChristmas) spent--;
  if (spent < 0) spent = 0;

  countdownEl.innerHTML = `
    <div style="font-size: 20px; margin-bottom: 6px;">
      ${days}d ${hours}h ${minutes}m ${seconds}s
    </div>
    <div style="font-size: 14px; opacity: 0.85;">
      We’ve spent ${spent} Christmas${spent === 1 ? "" : "es"} together
    </div>
  `;
}
