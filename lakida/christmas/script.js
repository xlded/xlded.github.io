const typeEl = document.getElementById("typewriter");
const tree = document.getElementById("tree");
const btn = document.getElementById("christmasBtn");
const result = document.getElementById("christmasResult");

let text = "";
let index = 0;
let linesTyped = 0;

/* -------- Load letter.txt -------- */
fetch("letter.txt")
  .then(res => res.text())
  .then(data => {
    text = data;
    type();
  });

/* -------- Typewriter -------- */
function type() {
  if (index < text.length) {
    const char = text[index];
    typeEl.innerHTML += char;

    if (char === "\n") {
      linesTyped++;
      moveTree();
    }

    index++;
    setTimeout(type, 45);
  } else {
    finish();
  }
}

/* -------- Tree scroll + zoom -------- */
function moveTree() {
  tree.style.top = `${8 + linesTyped * 4}%`;
}

function finish() {
  tree.style.transform = "scale(0.85)";
  btn.classList.add("show");
  btn.classList.remove("hidden");
}

/* -------- Christmas counter (future proof) -------- */
btn.onclick = () => {
  const startYear = 2025; // relationship year
  const now = new Date();
  const year = now.getFullYear();

  let count = year - startYear;

  const thisYearsChristmas = new Date(year, 11, 25);
  if (now < thisYearsChristmas) count--;

  if (count < 0) count = 0;

  result.innerText =
    count === 1
      ? "We’ve spent 1 Christmas together 🎄"
      : `We’ve spent ${count} Christmases together 🎄`;

  result.style.opacity = 1;
};
