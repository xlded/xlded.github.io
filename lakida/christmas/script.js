console.log("Christmas script running");

/* --------------------
   CONFIG
-------------------- */
const LETTER_FILE = "christmas-letter.txt?v=" + Date.now();

/* --------------------
   ELEMENTS
-------------------- */
const typeEl = document.getElementById("typewriter");
const button = document.getElementById("christmasBtn");
const result = document.getElementById("christmasResult");

/* --------------------
   TYPEWRITER
-------------------- */
function startTypewriter(text) {
  let i = 0;
  typeEl.innerHTML = "";
  button.style.opacity = 0;

  function type() {
    if (i < text.length) {
      typeEl.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(type, 40);
    } else {
      button.style.opacity = 1;
    }
  }

  type();
}

/* --------------------
   LOAD LETTER
-------------------- */
fetch(LETTER_FILE)
  .then(res => {
    console.log("Fetch status:", res.status);
    if (!res.ok) throw new Error("Letter file not found");
    return res.text();
  })
  .then(text => {
    console.log("Letter loaded");
    startTypewriter(text);
  })
  .catch(err => {
    console.error(err);
    typeEl.innerText =
      "❄️ The Christmas letter couldn't load.\nCheck the file name and folder.";
  });

/* --------------------
   BUTTON CLICK
-------------------- */
button.onclick = () => {
  result.style.opacity = 1;
  updateCountdown();
  setInterval(updateCountdown, 1000);
};

/* --------------------
   COUNTDOWN + CHRISTMASES
-------------------- */
function updateCountdown() {
  const now = new Date();

  let nextChristmas = new Date(now.getFullYear(), 11, 25);
  if (now > nextChristmas) {
    nextChristmas = new Date(now.getFullYear() + 1, 11, 25);
  }

  const diff = nextChristmas - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const startYear = 2025;
  let spent = now.getFullYear() - startYear;
  if (now < new Date(now.getFullYear(), 11, 25)) spent--;
  if (spent < 0) spent = 0;

  result.innerHTML = `
    <div>${days}d ${hours}h ${minutes}m ${seconds}s</div>
    <div>We’ve spent ${spent} Christmas${spent === 1 ? "" : "es"} together 🎄</div>
  `;
}
