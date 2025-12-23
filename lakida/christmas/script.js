const scene = document.getElementById("scene");
const typeEl = document.getElementById("typewriter");
const btn = document.getElementById("christmasBtn");
const result = document.getElementById("christmasResult");

let text = "";
let i = 0;
let lines = 0;

/* Load letter */
fetch("letter.txt")
  .then(r => r.text())
  .then(t => {
    text = t;
    type();
  });

/* Typewriter */
function type() {
  if (i < text.length) {
    const char = text[i];
    typeEl.innerHTML += char;

    if (char === "\n") {
      lines++;
      scrollBackground();
    }

    i++;
    setTimeout(type, 45);
  } else {
    finish();
  }
}

/* Scroll background DOWN as lines appear */
function scrollBackground() {
  const y = Math.min(80, lines * 6); // clamp so it never goes too far
  scene.style.backgroundPosition = `center ${y}%`;
}

/* Zoom OUT at end */
function finish() {
  scene.style.backgroundSize = "100%";
  btn.classList.add("show");
  btn.classList.remove("hidden");
}

/* Christmas counter (future-proof) */
btn.onclick = () => {
  const startYear = 2025;
  const now = new Date();
  const year = now.getFullYear();

  let count = year - startYear;
  const christmas = new Date(year, 11, 25);
  if (now < christmas) count--;

  if (count < 0) count = 0;

  result.innerText =
    count === 1
      ? "We’ve spent 1 Christmas together 🎄"
      : `We’ve spent ${count} Christmases together 🎄`;

  result.style.opacity = 1;
};
