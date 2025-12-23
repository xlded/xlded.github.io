// ---------------------------
// CONFIG
// ---------------------------
const letterFile = "letter.txt"; // your love letter file
const christmasBtn = document.getElementById("christmasBtn");
const christmasResult = document.getElementById("christmasResult");
const typewriterDiv = document.getElementById("typewriter");
const treeDiv = document.createElement("div"); // optional for syncing tree

// ---------------------------
// HELPER: Typewriter effect
// ---------------------------
async function typeWriterEffect(callback) {
  try {
    const res = await fetch(letterFile);
    let text = await res.text();

    // replace line breaks with <br> so formatting is preserved
    text = text.replace(/\n/g, "<br>");

    let i = 0;
    function type() {
      if (i < text.length) {
        // append character by character, but treat <br> as one entity
        if (text.slice(i, i+4) === "<br>") {
          typewriterDiv.innerHTML += "<br>";
          i += 4;
        } else {
          typewriterDiv.innerHTML += text.charAt(i);
          i++;
        }
        // smooth scroll effect
        typewriterDiv.scrollIntoView({behavior: "smooth", block: "nearest"});
        requestAnimationFrame(type);
      } else {
        if (callback) callback();
      }
    }
    type();
  } catch (err) {
    typewriterDiv.innerHTML = "💌 Failed to load letter.";
    console.error(err);
    if (callback) callback();
  }
}


// ---------------------------
// CALCULATE CHRISTMAS COUNT
// ---------------------------
function calculateChristmasCount() {
  const start = new Date("May 24, 2025"); // relationship start
  const now = new Date();
  const currentYear = now.getFullYear();

  // count how many Decembers have passed since May 24, 2025
  let count = 0;
  for (let year = 2025; year <= currentYear; year++) {
    const xmas = new Date(year, 11, 25); // Dec 25
    if (xmas >= start && xmas <= now) count++;
  }
  return count;
}

// ---------------------------
// NEXT CHRISTMAS COUNTDOWN
// ---------------------------
function getNextChristmasCountdown() {
  const now = new Date();
  let nextXmas = new Date(now.getFullYear(), 11, 25); // Dec 25 current year
  if (now > nextXmas) {
    nextXmas = new Date(now.getFullYear() + 1, 11, 25);
  }

  const diff = nextXmas - now;
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((diff % (1000*60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// ---------------------------
// BUTTON CLICK HANDLER
// ---------------------------
christmasBtn.addEventListener("click", () => {
  // Fade in countdown and Christmas count
  christmasResult.style.opacity = 1;
  christmasResult.innerHTML = `
    🎄 Next Christmas: <span id="xmasCountdown">${getNextChristmasCountdown()}</span><br>
    💖 Christmases spent together: ${calculateChristmasCount()}
  `;

  // Update countdown every second
  setInterval(() => {
    const countdownSpan = document.getElementById("xmasCountdown");
    if (countdownSpan) countdownSpan.innerText = getNextChristmasCountdown();
  }, 1000);
});

// ---------------------------
// TYPEWRITER + SHOW BUTTON
// ---------------------------
typeWriterEffect(() => {
  // show the button after typing
  christmasBtn.style.opacity = 1;
  christmasBtn.style.transition = "opacity 1s ease, transform 0.25s ease";
});

// ---------------------------
// OPTIONAL: smooth tree scroll synced with typing
// ---------------------------
// Assuming you have a div#tree or treeDiv on the right
// We can increment its transform based on scroll or typewriter index
// For simplicity, attach it to main if needed
// const mainDiv = document.querySelector(".main");
// mainDiv.appendChild(treeDiv);
