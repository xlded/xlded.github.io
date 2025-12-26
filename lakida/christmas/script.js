// /christmas/script.js (or wherever this page lives)

// ---------------------------
// DOM
// ---------------------------
const typewriterDiv = document.getElementById("typewriter");
const letterWrap = document.getElementById("letterWrap");

const toggleLetterBtn = document.getElementById("toggleLetterBtn");

const christmasBtn = document.getElementById("christmasBtn");
const christmasResult = document.getElementById("christmasResult");

// ---------------------------
// CONFIG
// ---------------------------
const LETTER_FILE = "letter.txt";

// Start date (for "Christmases spent together")
const START_DATE = new Date("May 24, 2025 00:00:00");

// ---------------------------
// STATE
// ---------------------------
let letterCollapsed = false;
let resultOpen = false;
let countdownInterval = null;

// ---------------------------
// HELPERS
// ---------------------------
function setLetterCollapsed(collapsed) {
  letterCollapsed = collapsed;

  if (!letterWrap || !toggleLetterBtn) return;

  // NEW: Toggle a class on the whole card so desktop can collapse the left column too
  const card = letterWrap.closest(".letter-card");
  if (card) card.classList.toggle("letter-collapsed", collapsed);

  if (collapsed) {
    letterWrap.classList.add("collapsed");
    toggleLetterBtn.textContent = "Show letter ✨";
  } else {
    letterWrap.classList.remove("collapsed");
    toggleLetterBtn.textContent = "Hide letter ✨";
  }
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

function getChristmasInfo() {
  const now = new Date();
  const year = now.getFullYear();

  const xmasStart = new Date(year, 11, 25, 0, 0, 0, 0);
  const xmasEnd = new Date(year, 11, 25, 23, 59, 59, 999);

  if (now < xmasStart) {
    return { mode: "until", text: `${formatCountdown(xmasStart - now)} until Christmas🎄` };
  }

  if (now >= xmasStart && now <= xmasEnd) {
    return { mode: "today", text: `Merry Christmas 🎄` };
  }

  const daysSince = Math.floor((now - xmasStart) / (1000 * 60 * 60 * 24));
  return { mode: "since", text: `${daysSince} day${daysSince === 1 ? "" : "s"} since Christmas 🎄` };
}

function calculateChristmasCount() {
  const now = new Date();
  const currentYear = now.getFullYear();
  let count = 0;

  for (let year = START_DATE.getFullYear(); year <= currentYear; year++) {
    const xmasEnd = new Date(year, 11, 25, 23, 59, 59, 999);
    if (xmasEnd >= START_DATE && xmasEnd <= now) count++;
  }
  return count;
}

function renderResult() {
  const info = getChristmasInfo();
  const togetherCount = calculateChristmasCount();

  christmasResult.innerHTML = `
    <div id="xmasLine">${info.text}</div>
    <div style="margin-top:8px;">💖 Christmases spent together: ${togetherCount}</div>
  `;
}

// ---------------------------
// TYPEWRITER
// (smooth + autoscroll inside the letter box)
// ---------------------------
async function typeWriterEffect(onDone) {
  try {
    const res = await fetch(LETTER_FILE, { cache: "no-store" });
    const text = await res.text();

    const lines = text.split("\n");

    typewriterDiv.innerHTML = "";
    const scroller = letterWrap;

    let lineIndex = 0;
    let charIndex = 0;

    const baseDelay = 12;
    const punctuationDelay = 70;

    function nextDelay(ch) {
      if (ch === "." || ch === "!" || ch === "?") return punctuationDelay;
      if (ch === "," || ch === ";" || ch === ":") return punctuationDelay * 0.55;
      return baseDelay;
    }

    function step() {
      if (lineIndex >= lines.length) {
        if (typeof onDone === "function") onDone();
        return;
      }

      const line = lines[lineIndex];

      if (charIndex < line.length) {
        const ch = line.charAt(charIndex);
        typewriterDiv.innerHTML += ch;
        charIndex++;

        if (scroller) scroller.scrollTop = scroller.scrollHeight;
        setTimeout(step, nextDelay(ch));
        return;
      }

      typewriterDiv.innerHTML += "<br>";
      lineIndex++;
      charIndex = 0;

      if (scroller) scroller.scrollTop = scroller.scrollHeight;
      setTimeout(step, 35);
    }

    step();
  } catch (e) {
    console.error(e);
    typewriterDiv.textContent = "💌 Failed to load the letter.";
    if (typeof onDone === "function") onDone();
  }
}

// ---------------------------
// EVENTS
// ---------------------------
if (toggleLetterBtn) {
  toggleLetterBtn.addEventListener("click", () => {
    setLetterCollapsed(!letterCollapsed);
  });
}

if (christmasBtn) {
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
        const xmasLine = document.getElementById("xmasLine");
        if (!xmasLine) return;
        xmasLine.textContent = getChristmasInfo().text;
      }, 1000);
    }
  });
}

// ---------------------------
// START
// ---------------------------
typeWriterEffect(() => {
  if (toggleLetterBtn) {
    toggleLetterBtn.hidden = false;
    requestAnimationFrame(() => toggleLetterBtn.classList.add("show"));
  }

  setLetterCollapsed(false);

  if (christmasBtn) {
    christmasBtn.style.opacity = "1";
    christmasBtn.style.transform = "translateY(0)";
  }
});
