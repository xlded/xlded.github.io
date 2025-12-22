/* -------------------
   FALLING EMOJIS
------------------- */
const mainEmojis = ["🌹", "💔"];
function createMainEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.innerText = mainEmojis[Math.floor(Math.random() * mainEmojis.length)];

  emoji.style.left = Math.random() * (window.innerWidth - 30) + "px";
  emoji.style.fontSize = 18 + Math.random() * 14 + "px";

  const angle = Math.random() * 360;
  const spinDuration = 20 + Math.random() * 15;
  const fallDuration = 8 + Math.random() * 6;
  emoji.style.transform = `rotate(${angle}deg)`;
  emoji.style.animation = `fall ${fallDuration}s linear, spin ${spinDuration}s linear infinite`;

  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), fallDuration * 1000);
}
setInterval(createMainEmoji, 500);

/* Extra hearts in time block */
const timeBlock = document.querySelector('[data-function="time"]');
function createTopHeart() {
  const heart = document.createElement("div");
  heart.classList.add("emoji");
  heart.innerText = "💖";

  const rect = timeBlock.getBoundingClientRect();
  heart.style.left = rect.left + Math.random() * rect.width + "px";
  heart.style.top = rect.top + Math.random() * rect.height + "px";
  heart.style.fontSize = 18 + Math.random() * 10 + "px";

  const angle = Math.random() * 360;
  const spinDuration = 10 + Math.random() * 15;
  heart.style.transform = `rotate(${angle}deg)`;
  heart.style.animation = `spin ${spinDuration}s linear infinite`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createTopHeart, 800);

/* -------------------
   Count-up timer
------------------- */
const startDate = new Date("May 24, 2025 00:00:00");
function updateTimer() {
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / (1000*60*60*24));
  diff %= (1000*60*60*24);
  const hours = Math.floor(diff / (1000*60*60));
  diff %= (1000*60*60);
  const minutes = Math.floor(diff / (1000*60));
  diff %= (1000*60);
  const seconds = Math.floor(diff / 1000);

  document.getElementById("timer").innerText =
    `Together for ${days} days, ${hours}h ${minutes}m ${seconds}s 💕`;
}
setInterval(updateTimer, 1000);
updateTimer();

/* -------------------
   Seasonal Button
------------------- */
const month = new Date().getMonth();
const seasonBtn = document.getElementById("seasonButton");
if (month === 11) {
  seasonBtn.innerText = "🎄 Christmas";
  seasonBtn.href = "/lakida/christmas";
  seasonBtn.classList.add("christmas");
} else if (month >= 8 && month <= 10) {
  seasonBtn.innerText = "🎃 Halloween";
  seasonBtn.href = "/lakida/halloween";
  seasonBtn.classList.add("halloween");
} else {
  seasonBtn.style.display = "none";
}

/* -------------------
   Example function system
------------------- */
document.querySelectorAll(".block").forEach(block => {
  const func = block.dataset.function;
  block.addEventListener("click", () => {
    switch(func) {
      case "time":
        alert("This is the timer block!");
        break;
      case "season":
        // season button click handled separately
        break;
      case "photo":
        alert("Photo Album will come soon!");
        break;
      case "empty":
        alert("Empty block clicked!");
        break;
      default:
        console.log("Block clicked:", func);
    }
  });
});
