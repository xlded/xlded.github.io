const text = `
My love,

Christmas has always been about warmth.
Lights in the dark.
Soft music.
Quiet moments.

But somehow…
it feels like it was waiting for you.

Even though we haven't spent a Christmas together yet,
I already know —
every future one will feel like home.

Forever yours,
always.
`;

const typeEl = document.getElementById("typewriter");
const tree = document.getElementById("tree");
const btn = document.getElementById("christmasBtn");
const result = document.getElementById("christmasResult");
const scene = document.getElementById("scene");

let i = 0;
let lineCount = 0;

function typeWriter() {
  if (i < text.length) {
    const char = text.charAt(i);
    typeEl.innerHTML += char;

    if (char === "\n") {
      lineCount++;
      moveTree();
    }

    i++;
    setTimeout(typeWriter, 40);
  } else {
    finishTyping();
  }
}

function moveTree() {
  const baseTop = 5;
  tree.style.top = `${baseTop + lineCount * 6}%`;
}

function finishTyping() {
  btn.classList.add("show");
  btn.classList.remove("hidden");

  setTimeout(() => {
    scene.classList.add("cozy");
  }, 1200);
}

/* Christmas count logic */
btn.onclick = () => {
  const start = new Date("May 24, 2025");
  const now = new Date();

  let christmases = now.getFullYear() - start.getFullYear();

  const thisYearsChristmas = new Date(now.getFullYear(), 11, 25);
  if (now < thisYearsChristmas) christmases--;

  if (christmases < 0) christmases = 0;

  result.innerText =
    christmases === 0
      ? "We haven't spent one yet… but I can't wait 🎄"
      : `We've spent ${christmases} Christmas${christmases > 1 ? "es" : ""} together 🎄`;

  result.style.opacity = 1;
};

typeWriter();
