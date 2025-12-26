// ---------------------------
// CONFIG
// ---------------------------
const letterFile = "letter.txt";
const christmasBtn = document.getElementById("christmasBtn");
const christmasResult = document.getElementById("christmasResult");
const typewriterDiv = document.getElementById("typewriter");

let countdownInterval = null;
let resultOpen = false;

// ---------------------------
// TYPEWRITER EFFECT
// ---------------------------
async function typeWriterEffect(done) {
  try {
    const res = await fetch(letterFile, { cache: "no-store" });
    let text = await res.text();

    // preserve line breaks
    const chunks = text.split("\n").map(line => line.trimEnd());

    typewriterDiv.innerHTML = "";
    let lineIndex = 0;
    let charIndex = 0;

    const scroller = typewriterDiv.parentElement; // .typewrap

    function step() {
      if (lineIndex >= chunks.length) {
        if (done) done();
        return;
      }

      const line = chunks[lineIndex];

      // write current line char-by-char
      if (charIndex < line.length) {
        typewriterDiv.innerHTML += line.charAt(charIndex);
        charIndex++;
      } else {
        // move to next line
        typewriterDiv.innerHTML += "<br>";
        lineIndex++;
        charIndex = 0;
      }

      // autoscroll within the letter box
      if (scroller) scroller.scrollTop = scroller.scrollHeight;

      requestAnimationFrame(step);
    }

    step();
  } catch (err) {
    console.error(err);
    typewriterDiv.textContent = "💌 Failed to load letter.";
    if (done) done();
  }
}

// ---------------------------
// CALCULATE CHRISTMASES TOGETHER
// ---------------------------
function calculateChristmasCount() {
  const start = new Date("May 24, 2025");
  const now = new Date();
  const currentYear = now.getFullYear();

  let count = 0;
  for (let year = 2025; year <= currentYear; year++) {
    const xmas = new Date(year, 11, 25, 23, 59, 59, 999);
    if (xmas >= start && xmas <= now) count++;
  }
  return count;
}

// ---------------------------
// NEXT CHRISTMAS COUNTDOWN (or "days since")
// ---------------------------
function getChristmasInfo() {
  const now = new Date();
  const thisXmasStart = new Date(now.getFullYear(), 11, 25, 0, 0, 0, 0);
  const thisXmasEnd = new Date(now.getFullYear(), 11, 25, 23, 59, 59, 999);

  // Before Christmas day
  if (now < thisXmasStart) {
    const diff = thisXmasStart - now;
    return { mode: "until", label: formatCountdown(diff) };
  }

  // During Christmas day
  if (now >= thisXmasStart && now <= thisXmasEnd) {
    return { mode: "today", label: "Merry Christmas 🎄" };
  }

  // After Christmas day
  const diffMs = now - thisXmasStart;
  const daysSince = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return { mode: "since", label: `${daysSince} day${daysSince === 1 ? "" : "s"} since Christmas 🎄` };
}

function formatCountdown(ms) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function renderResult() {
  const info = getChristmasInfo();
  const togetherCount = calculateChristmasCount();

  let firstLine = "";
  if (info.mode === "until") firstLine = `🎄 Next Christmas: <span id="xmasCountdown">${info.label}</span>`;
  if (info.mode === "today") firstLine = `🎄 <span id="xmasCountdown">${info.label}</span>`;
  if (info.mode === "since") firstLine = `🎄 <span id="xmasCountdown">${info.label}</span>`;

  christmasResult.innerHTML = `
    ${firstLine}<br>
    💖 Christmases spent together: ${togetherCount}
  `;
}

// ---------------------------
// BUTTON (toggle + single interval)
// ---------------------------
christmasBtn.addEventListener("click", () => {
  resultOpen = !resultOpen;
  christmasBtn.setAttribute("aria-expanded", String(resultOpen));

  if (!resultOpen) {
    christmasResult.classList.remove("show");
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    return;
  }

  christmasResult.classList.add("show");
  renderResult();

  if (!countdownInterval) {
    countdownInterval = setInterval(() => {
      const span = document.getElementById("xmasCountdown");
      if (!span) return;
      span.textContent = getChristmasInfo().label;
    }, 1000);
  }
});

// ---------------------------
// START: Typewriter then reveal button
// ---------------------------
typeWriterEffect(() => {
  christmasBtn.style.opacity = "1";
  christmasBtn.style.transform = "translateY(0)";
});
